import React, { useState } from 'react';
import { styled } from 'styled-components';
import ReviewEditor from '@/components/ReviewEditor';
import ReviewAssistant from '@/components/ReviewAssistant';
import { Margin } from '@/ui/margin/margin';
import useHeightToParent from '@/hooks/useHeightToParent';
import { useReviewAndComments } from '@/hooks/useReviewAndComments';

export default function ReviewWrite() {
  const { componentRef } = useHeightToParent();

  const [title, setTitle] = useState<string>('');

  const {
    reviewInput,
    setReviewInput,
    comments,
    setComments,
    handleInputChange,
  } = useReviewAndComments();

  return (
    <Container ref={componentRef}>
      <ReviewEditor
        reviewInput={reviewInput}
        setReviewInput={setReviewInput}
        handleInputChange={handleInputChange}
        title={title}
        setTitle={setTitle}
      />
      <Margin margin={'0 0 0 20px'} />
      <ReviewAssistant
        comments={comments}
        setComments={setComments}
        reviewInput={reviewInput}
        setReviewInput={setReviewInput}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 680px;
  margin: 0 auto;
  display: flex;
`;
