import StatBars from '@/components/ReviewStats/StatBars';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useMemo } from 'react';
import { styled } from 'styled-components';
import RatingStatBox from './RatingStatBox';
import LoadingBar from '@/ui/loadingBar/LoadingBar';

interface Props {
  reviewStats: any;
  isLoading: boolean;
  isError: boolean;
}

export default function ReviewStats({
  reviewStats,
  isLoading,
  isError,
}: Props) {
  const getMaxPropertyCount = () => {
    return Math.max(
      reviewStats?.oneStarRatingCount,
      reviewStats?.twoStarRatingCount,
      reviewStats?.threeStarRatingCount,
      reviewStats?.fourStarRatingCount,
      reviewStats?.fiveStarRatingCount
    );
  };

  const maxCount = useMemo(() => getMaxPropertyCount(), [reviewStats]);

  return (
    <Box>
      <StatItem>
        {/* 점수에 따라 별점 채워짐(0.1 단위) */}
        {reviewStats && (
          <RatingStatBox rating={reviewStats?.averageRating.toFixed(1)} />
        )}
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
        {/* 가장 많은 별점 수를 기준으로, 퍼센트(%)만큼 채워짐 */}
        {reviewStats && (
          <StatBars
            scoreList={[
              reviewStats?.fiveStarRatingCount,
              reviewStats?.fourStarRatingCount,
              reviewStats?.threeStarRatingCount,
              reviewStats?.twoStarRatingCount,
              reviewStats?.oneStarRatingCount,
            ]}
            max={maxCount}
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
