import StatBars from '@/components/ReviewStats/StatBars';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useContext } from 'react';
import { styled } from 'styled-components';
import RatingStatBox from './RatingStatBox';
import { useReviewStats } from '@/hooks/useStats';
import ProductIdContext from '../contexts/ProductIdContext';
import LoadingBar from '@/ui/loadingBar/LoadingBar';

export default function ReviewStats() {
  const { partnerDomain, partnerProductId } = useContext(ProductIdContext);

  const {
    data: reviewStats,
    isLoading,
    isError,
  } = useReviewStats({
    partnerDomain: partnerDomain,
    singleTravelProductPartnerCustomId: partnerProductId,
  });

  return (
    <Box>
      <StatItem>
        {/* 점수에 따라 별점 채워짐(0.1 단위) */}
        {reviewStats && <RatingStatBox rating={reviewStats?.averageRating} />}
        <Margin margin={'5px 0 0 0'} />
        {reviewStats && (
          <Fonts.num2>{reviewStats?.averageRating.toFixed(1)}</Fonts.num2>
        )}
      </StatItem>
      <StatItem>
        {isLoading && <LoadingBar />}
        {isError && <Fonts.body3>리뷰 통계를 불러오지 못했습니다.</Fonts.body3>}
        {reviewStats && (
          <>
            <Fonts.body3>총 리뷰 수</Fonts.body3>
            <Margin margin={'10px 0 0 0'} />
            <Fonts.num2>{reviewStats?.reviewCount}</Fonts.num2>
          </>
        )}
      </StatItem>
      <StatItem>
        {/* 전체 리뷰 수를 100으로, 퍼센트(%)만큼 채워짐 */}
        {reviewStats && (
          <StatBars
            scoreList={[
              reviewStats?.fiveStarRatingCount,
              reviewStats?.fourStarRatingCount,
              reviewStats?.threeStarRatingCount,
              reviewStats?.twoStarRatingCount,
              reviewStats?.oneStarRatingCount,
            ]}
            max={reviewStats?.reviewCount}
          />
        )}
      </StatItem>
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  height: 180px;
  border: solid 1px ${colors.gray06};
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-sizing: border-box;
`;

const StatItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
