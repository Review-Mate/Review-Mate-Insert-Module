import React, { useState } from 'react';
import { styled } from 'styled-components';
import ReviewEditor from '@/components/ReviewEditor';
import ReviewAssistant from '@/components/ReviewAssistant';
import { Margin } from '@/ui/margin/margin';
import { CommentType } from '@/types/Comments';
import useHeightToParent from '@/hooks/useHeightToParent';

export default function ReviewWrite() {
  const { componentRef } = useHeightToParent();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [comments, setComments] = useState<CommentType[]>([]);

  return (
    <Container ref={componentRef}>
      <ReviewEditor
        comments={comments}
        setComments={setComments}
        content={content}
        setContent={setContent}
        title={title}
        setTitle={setTitle}
      />
      <Margin margin={'0 0 0 20px'} />
      <ReviewAssistant
        comments={comments}
        setComments={setComments}
        content={content}
        setContent={setContent}
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
