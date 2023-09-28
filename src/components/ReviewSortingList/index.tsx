import React from 'react';
import { styled } from 'styled-components';
import KeywordSort from './KeywordSortBar';
import ReviewSort from './ReviewSortBar';
import Reviews from './Reviews';
import { ReviewType } from '@/types/RivewType';

interface Props {
  reviewList: ReviewType[];
}

export default function ReviewSortingList(props: Props) {
  const { reviewList } = props;
  console.log(reviewList);
  return (
    <Container>
      <ReviewSort />
      <KeywordSort />
      {reviewList.map((review: ReviewType) => (
        <Reviews
          key={review.id}
          id={review.id}
          title={review.title}
          rating={review.rating}
          content={review.content}
          createdAt={review.createdAt}
          authorName={review.authorName}
          polarity={review.polarity}
          // image={review.image}
          reviewHighlightPairResponses={review.reviewHighlightPairResponses}
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
