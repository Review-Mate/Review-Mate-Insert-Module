import KeywordStats from '@/components/KeywordStats';
import ReviewSortingList from '@/components/ReviewSortingList';
import ReviewStats from '@/components/ReviewStats';
import { reviews } from '@/data/reviewData';
import { ReviewType } from '@/types/RivewType';
import { Margin } from '@/ui/margin/margin';
import React from 'react';
import { styled } from 'styled-components';

export default function ReviewList() {
  const [rating, setRating] = React.useState(5.0);

  // 5,4,3,2,1점
  const [scoreList, setScoreList] = React.useState([80, 60, 40, 20, 30]);

  const [reviewList, setReviewList] = React.useState<ReviewType[]>(reviews);

  return (
    <Container>
      <ReviewStats rating={rating} scoreList={scoreList} />
      <Margin margin={'30px 0 0 0'} />
      <KeywordStats />
      <Margin margin={'30px 0 0 0'} />
      <ReviewSortingList reviewList={reviewList} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  min-width: 600px;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
`;
