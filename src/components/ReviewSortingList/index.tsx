import React, { useState } from 'react';
import { styled } from 'styled-components';
import KeywordSort from './KeywordSortBar';
import Reviews from './Reviews';
import { ReviewType } from '@/types/ReviewType';
import ReviewSortBar from './ReviewSortBar';
import { ReviewSort } from '@/config/enum';

interface Props {
  reviewList: ReviewType[];
  selectedOption: ReviewSort;
  setSelectedOption: React.Dispatch<React.SetStateAction<ReviewSort>>;
}

export default function ReviewSortingList({
  reviewList,
  selectedOption,
  setSelectedOption,
}: Props) {
  return (
    <Container>
      <ReviewSortBar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
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
