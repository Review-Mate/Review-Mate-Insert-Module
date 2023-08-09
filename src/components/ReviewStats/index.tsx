import StatBars from '@/components/ReviewStats/StatBars';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { styled } from 'styled-components';
import RatingStatBox from './RatingStatBox';

interface Props {
  rating: number;
  scoreList: number[];
}

export default function ReviewStats(prop: Props) {
  const { rating, scoreList } = prop;

  return (
    <Box>
      <StatItem>
        {/* 점수에 따라 별점 채워짐(0.1 단위) */}
        <RatingStatBox rating={rating} />
        <Margin margin={'5px 0 0 0'} />
        <Fonts.num2>{rating}</Fonts.num2>
      </StatItem>
      <StatItem>
        <Fonts.body3>총 리뷰 수</Fonts.body3>
        <Margin margin={'10px 0 0 0'} />
        <Fonts.num2>4500</Fonts.num2>
      </StatItem>
      <StatItem>
        {/* 전체가 100, 퍼센트(%)만큼 채워짐 */}
        <StatBars scoreList={scoreList} />
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
`;

const StatItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
