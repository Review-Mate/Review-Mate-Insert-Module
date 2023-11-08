import React from 'react';
import { styled } from 'styled-components';
import KeywordSortBar from './KeywordSortBar';
import Reviews from './Reviews';
import { ReviewType } from '@/types/ReviewType';
import ReviewSortBar from './ReviewSortBar';
import { ReviewSort } from '@/config/enum';
import { Fonts } from '@/utils/GlobalFonts';

interface Props {
  reviewList: ReviewType[];
  selectedOption: ReviewSort;
  setSelectedOption: React.Dispatch<React.SetStateAction<ReviewSort>>;
  totalPages: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export default function ReviewSortingList({
  reviewList,
  selectedOption,
  setSelectedOption,
  totalPages,
  setSelectedPage,
  currentPage,
}: Props) {
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const onPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPage(parseInt(e.currentTarget.value));
  };

  return (
    <Container>
      <ReviewSortBar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <KeywordSortBar setSelectedPage={setSelectedPage} />
      {reviewList?.map((review: ReviewType) => (
        <Reviews
          key={review.id}
          id={review.id}
          title={review.title}
          rating={review.rating}
          content={review.content}
          createdAt={review.createdAt}
          authorName={review.authorName}
          polarity={review.polarity}
          reviewImageUrls={review.reviewImageUrls}
          reviewTagIndexResponses={review.reviewTagIndexResponses}
        />
      ))}

      <PageButtonBox>
        {pageButtons?.map((pageButton) => (
          <PageButton key={pageButton} value={pageButton} onClick={onPageClick}>
            <Fonts.body3 weight={currentPage == pageButton ? 900 : 300}>
              {pageButton}
            </Fonts.body3>
          </PageButton>
        ))}
      </PageButtonBox>
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

const PageButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageButton = styled.button`
  margin: 0 8px;
  width: 30px;
  height: 30px;
`;
