import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import { ReviewStatsType, TagStatsType } from '@/types/ReviewType';

export interface FetchStats {
  partnerDomain: string;
  singleTravelProductPartnerCustomId: string;
}

// 단일 여행 상품에 등록된 리뷰 통계 조회
const fetchReviewStats = async ({
  partnerDomain,
  singleTravelProductPartnerCustomId,
}: FetchStats): Promise<ReviewStatsType> => {
  const { data } = await axios.get(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/products/${singleTravelProductPartnerCustomId}/statistics/reviews`
  );
  return data;
};

// 단일 여행 상품에 등록된 태그 통계 조회
const fetchTagStats = async ({
  partnerDomain,
  singleTravelProductPartnerCustomId,
}: FetchStats): Promise<TagStatsType[]> => {
  const { data } = await axios.get(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/products/${singleTravelProductPartnerCustomId}/statistics/tags`
  );
  return data;
};

// 단일 여행 상품에 등록된 리뷰 통계 조회
export const useReviewStats = ({
  partnerDomain,
  singleTravelProductPartnerCustomId,
}: FetchStats) => {
  return useQuery<ReviewStatsType, Error>(
    ['reviewStats', partnerDomain, singleTravelProductPartnerCustomId],
    () =>
      fetchReviewStats({
        partnerDomain,
        singleTravelProductPartnerCustomId,
      }),
    {
      onError: (error) => {
        throw error;
      },
    }
  );
};

// 단일 여행 상품에 등록된 태그 통계 조회
export const useTagStats = ({
  partnerDomain,
  singleTravelProductPartnerCustomId,
}: FetchStats) => {
  return useQuery<TagStatsType[], Error>(
    ['tagStats', partnerDomain, singleTravelProductPartnerCustomId],
    () =>
      fetchTagStats({
        partnerDomain,
        singleTravelProductPartnerCustomId,
      }),
    {
      onError: (error) => {
        throw error;
      },
    }
  );
};
