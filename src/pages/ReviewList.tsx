import KeywordStats from '@/components/KeywordStats';
import ReviewSortingList from '@/components/ReviewSortingList';
import ReviewStats from '@/components/ReviewStats';
import { PARTNER_DOMAIN } from '@/config/api';
import { PARTNER_CUSTOM_PRODUCT_ID } from '@/config/constants';
import useMessageToParent from '@/hooks/useMessageToParent';
import { useProductReviews } from '@/hooks/useReviews';
import { SCORE_AVE, SCORE_LIST } from '@/temp/constant';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import React from 'react';
import { styled } from 'styled-components';

export default function ReviewList() {
  const { componentRef, setHeightChange, heightChange } = useMessageToParent();

  const { data, isLoading } = useProductReviews({
    partnerDomain: PARTNER_DOMAIN,
    travelProductPartnerCustomId: PARTNER_CUSTOM_PRODUCT_ID,
    onSuccess: () => {
      setHeightChange(!heightChange);
    },
  });

  return (
    <Container ref={componentRef}>
      <Title>
        <Fonts.body1>리뷰</Fonts.body1>
      </Title>
      <ReviewStats rating={SCORE_AVE} scoreList={SCORE_LIST} />
      <Margin margin={'30px 0 0 0'} />
      <KeywordStats setHeightChange={setHeightChange} />
      <Margin margin={'30px 0 0 0'} />
      {isLoading && <div>로딩중</div>}
      {!isLoading && data && <ReviewSortingList reviewList={data?.content} />}
    </Container>
  );
}

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  min-width: 600px;
  align-items: center;
  flex-direction: column;
`;
