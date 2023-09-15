import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import { ReviewType } from '@/types/RivewType';

type Review = {
  // 리뷰의 구조를 여기서 정의하세요.
};

// 리뷰 생성
const createReview = async (
  partnerDomain: string,
  reservationPartnerCustomId: string,
  reviewData: any
): Promise<Review> => {
  const { data } = await axios.post(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/reservations/${reservationPartnerCustomId}/reviews`,
    reviewData
  );
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

export const useCreateReview = (
  partnerDomain: string,
  reservationPartnerCustomId: string
) => {
  return useMutation((reviewData: any) =>
    createReview(partnerDomain, reservationPartnerCustomId, reviewData)
  );
};

export const useProductReviews = (
  partnerDomain: string,
  travelProductPartnerCustomId: string
) => {
  return useQuery<ReviewType[], Error>(
    ['productReviews', partnerDomain, travelProductPartnerCustomId],
    () => fetchProductReviews(partnerDomain, travelProductPartnerCustomId)
  );
};
