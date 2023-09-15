import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import { ReviewType } from '@/types/RivewType';

interface CreateReview {
  partnerDomain: string;
  reservationPartnerCustomId: string;
  reviewData: FormData;
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
const fetchProductReviews = async (
  partnerDomain: string,
  travelProductPartnerCustomId: string
): Promise<ReviewType[]> => {
  console.log('BASE_URL', BASE_URL);
  const { data } = await axios.get(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/products/${travelProductPartnerCustomId}/reviews?orderBy=LATEST&page=0&size=10`
  );
  console.log('데이터', data);
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

export const useProductReviews = (
  partnerDomain: string,
  travelProductPartnerCustomId: string
) => {
  return useQuery<ReviewType[], Error>(
    ['productReviews', partnerDomain, travelProductPartnerCustomId],
    () => fetchProductReviews(partnerDomain, travelProductPartnerCustomId),
    {
      onSuccess: () => {
        console.log('리뷰 불러오기 성공');
      },
      onError: () => {
        console.log('리뷰 불러오기 실패');
      },
    }
  );
};
