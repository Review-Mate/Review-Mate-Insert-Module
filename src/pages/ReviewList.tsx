import KeywordStats from '@/components/KeywordStats';
import ReviewSortingList from '@/components/ReviewSortingList';
import ReviewStats from '@/components/ReviewStats';
import { reviews } from '@/data/reviewData';
import useMessageToParent from '@/hooks/useMessageToParent';
import { ReviewType } from '@/types/RivewType';
import { Margin } from '@/ui/margin/margin';
import { Fonts } from '@/utils/GlobalFonts';
import React, { useState } from 'react';
import { styled } from 'styled-components';

export default function ReviewList() {
  const { componentRef, setHeightChange } = useMessageToParent();

  const [rating, setRating] = useState(5.0);

  // 5,4,3,2,1점
  const [scoreList, setScoreList] = useState([80, 60, 40, 20, 30]);

  const [reviewList, setReviewList] = useState<ReviewType[]>(reviews);

  return (
    <Container ref={componentRef}>
      <Title>
        <Fonts.body1>리뷰 (1035)</Fonts.body1>
      </Title>
      <ReviewStats rating={rating} scoreList={scoreList} />
      <Margin margin={'30px 0 0 0'} />
      <KeywordStats setHeightChange={setHeightChange} />
      <Margin margin={'30px 0 0 0'} />
      <ReviewSortingList reviewList={reviewList} />
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
  padding-top: 30px;
`;
