import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewEditor from '@/components/ReviewEditor';
import ReviewAssistant from '@/components/ReviewAssistant';
import { Margin } from '@/ui/margin/margin';
import { CommentType } from '@/types/Comments';
import useMessageToParent from '@/hooks/useMessageToParent';

export default function ReviewWrite() {
  const { componentRef } = useMessageToParent();

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
  height: 680px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
`;
