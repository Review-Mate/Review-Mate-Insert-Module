import ReviewStats from '@/components/ReviewStats';
import { Margin } from '@/ui/margin/margin';
import React from 'react';
import { styled } from 'styled-components';

export default function ReviewList() {
  const [rating, setRating] = React.useState(5.0);

  // 5,4,3,2,1점
  const [scoreList, setScoreList] = React.useState([80, 60, 40, 20, 30]);

  return (
    <Container>
      <ReviewStats rating={rating} scoreList={scoreList} />
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
