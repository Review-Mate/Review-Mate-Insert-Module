import KeywordStats from '@/components/KeywordStats';
import ReviewSortingList from '@/components/ReviewSortingList';
import ReviewStats from '@/components/ReviewStats';
import ProductIdContext from '@/components/contexts/ProductIdContext';
import { PARTNER_DOMAIN } from '@/config/api';
import useMessageToParent from '@/hooks/useMessageToParent';
import { useProductReviews } from '@/hooks/useReviews';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

export default function ReviewList() {
  const { componentRef, setHeightChange, heightChange } = useMessageToParent();
  const location = useLocation();
  // 파트너가 전달한 상품 아이디
  const partnerProductId = new URLSearchParams(location.search).get(
    'product_id'
  );

  // 상품 리뷰 목록 조회
  const { data, isLoading } = partnerProductId
    ? useProductReviews({
        partnerDomain: PARTNER_DOMAIN,
        travelProductPartnerCustomId: partnerProductId,
        onSuccess: () => {
          setHeightChange(heightChange + 1);
        },
      })
    : { data: null, isLoading: true };

  if (partnerProductId)
    return (
      <ProductIdContext.Provider value={partnerProductId}>
        <Container ref={componentRef}>
          <Title>
            <Fonts.body1>리뷰</Fonts.body1>
          </Title>
          <ReviewStats />
          <Margin margin={'30px 0 0 0'} />
          <KeywordStats />
          <Margin margin={'30px 0 0 0'} />
          {isLoading && <div>로딩중</div>}
          {!isLoading && data && (
            <ReviewSortingList reviewList={data?.content} />
          )}
        </Container>
      </ProductIdContext.Provider>
    );

  return <div>상품 아이디가 존재하지 않습니다.</div>;
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
