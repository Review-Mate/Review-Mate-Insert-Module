import React from 'react';
import { styled } from 'styled-components';
import KeywordSort from './KeywordSortBar';
import ReviewSort from './ReviewSortBar';
import Reviews from './Reviews';

interface Props {
  reviewList: {
    id: number;
    title: string;
    score: number;
    content: string;
    date: string;
    userId: string;
    image: string;
  }[];
}

export default function ReviewSortingList(props: Props) {
  const { reviewList } = props;
  return (
    <Container>
      <ReviewSort />
      <KeywordSort />
      {reviewList.map((review) => (
        <Reviews
          key={review.id}
          id={review.id}
          title={review.title}
          score={review.score}
          content={review.content}
          date={review.date}
          userId={review.userId}
          image={review.image}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  min-width: 600px;
  align-items: center;
  flex-direction: column;
`;
