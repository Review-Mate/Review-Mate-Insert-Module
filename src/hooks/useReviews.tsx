import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import { ReviewListSortType } from '@/types/ReviewType';
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
  return data;
};

// 상품에 리뷰 목록 조회
const fetchProductReviews = async ({
  partnerDomain,
  travelProductPartnerCustomId,
  reviewSort = ReviewSort.LATEST,
  reviewPage = 0,
  reviewListSize = 10,
}: FetchProductReviews): Promise<ReviewListSortType> => {
  const { data } = await axios.get(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/products/${travelProductPartnerCustomId}/reviews?orderCriteria=${reviewSort}&page=${reviewPage}&size=${reviewListSize}`
  );
  return data;
};

// 리뷰 생성
export const useCreateReview = (onSuccess?: () => void) => {
  return useMutation(createReview, {
    onSuccess: onSuccess,
    onError: () => {
      console.log('리뷰 생성 실패');
    },
  });
};

// 상품별 리뷰 목록 조회
export const useProductReviews = ({
  partnerDomain,
  travelProductPartnerCustomId,
  reviewSort = ReviewSort.LATEST,
  reviewPage = 0,
  reviewListSize = 10,
  onSuccess,
}: FetchProductReviews & { onSuccess?: () => void }) => {
  return useQuery<ReviewListSortType, Error>(
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
      onSuccess: onSuccess,
      onError: (error) => {
        console.log('리뷰 불러오기 실패', error);
      },
    }
  );
};
