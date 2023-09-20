import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import { ReviewType } from '@/types/RivewType';
import { ReviewSort, ReviewSortType } from '@/config/enum';

interface CreateReview {
  partnerDomain: string;
  reservationPartnerCustomId: string;
  reviewData: FormData;
}

export interface FetchProductReviews {
  partnerDomain: string;
  travelProductPartnerCustomId: string;
  reviewSort?: ReviewSortType;
  reviewPage?: number;
  reviewListSize?: number;
}

// 리뷰 생성
const createReview = async ({
  partnerDomain,
  reservationPartnerCustomId,
  reviewData,
}: CreateReview) => {
  const { data } = await axios.post(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/reservations/${reservationPartnerCustomId}/reviews`,
    reviewData
  );
  console.log('데이터', data);
  return data;
};

// 상품에 등록된 리뷰 목록 조회
const fetchProductReviews = async ({
  partnerDomain,
  travelProductPartnerCustomId,
  reviewSort = ReviewSort.LATEST,
  reviewPage = 0,
  reviewListSize = 10,
}: FetchProductReviews): Promise<ReviewType[]> => {
  const { data } = await axios.get(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/products/${travelProductPartnerCustomId}/reviews?orderBy=${reviewSort}&page=${reviewPage}&size=${reviewListSize}`
  );
  return data;
};

export const useCreateReview = () => {
  return useMutation(createReview, {
    onSuccess: () => {
      console.log('리뷰 생성 성공');
    },
    onError: () => {
      console.log('리뷰 생성 실패');
    },
  });
};

export const useProductReviews = ({
  partnerDomain,
  travelProductPartnerCustomId,
  reviewSort = ReviewSort.LATEST,
  reviewPage = 0,
  reviewListSize = 10,
}: FetchProductReviews) => {
  return useQuery<ReviewType[], Error>(
    ['productReviews', partnerDomain, travelProductPartnerCustomId],
    () =>
      fetchProductReviews({
        partnerDomain,
        travelProductPartnerCustomId,
        reviewSort,
        reviewPage,
        reviewListSize,
      }),
    {
      onSuccess: () => {
        console.log('리뷰 불러오기 성공');
      },
      onError: (error) => {
        console.log('리뷰 불러오기 실패', error);
      },
    }
  );
};
