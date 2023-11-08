import axios from 'axios';
import { FetchStats } from './useStats';
import { ReviewTagsType } from '@/types/TagType';
import { useQuery } from 'react-query';
import { BASE_URL } from '@/config/api';

const fetchTags = async ({
  partnerDomain,
  singleTravelProductPartnerCustomId,
}: FetchStats): Promise<ReviewTagsType> => {
  const { data } = await axios.get(
    `${BASE_URL}/api/widget/v1/${partnerDomain}/products/${singleTravelProductPartnerCustomId}/tags`
  );
  return data;
};

export const useTags = ({
  partnerDomain,
  singleTravelProductPartnerCustomId,
}: FetchStats) => {
  return useQuery<ReviewTagsType, Error>(
    ['tags', partnerDomain, singleTravelProductPartnerCustomId],
    () => fetchTags({ partnerDomain, singleTravelProductPartnerCustomId }),
    {
      onSuccess: () => {
        console.log('태그 불러오기 성공');
      },
      onError: () => {
        console.log('태그 불러오기 실패');
      },
    }
  );
};
