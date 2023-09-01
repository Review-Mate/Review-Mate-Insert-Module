import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewEditor from '@/components/ReviewEditor';
import ReviewAssistant from '@/components/ReviewAssistant';
import { Margin } from '@/ui/margin/margin';
import { CommentType } from '@/types/Comments';

export default function ReviewWrite() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState<string>('');

  return (
    <Container>
      <ReviewEditor
        comments={comments}
        setComments={setComments}
        text={text}
        setText={setText}
      />
      <Margin margin={'0 0 0 20px'} />
      <ReviewAssistant comments={comments} text={text} setText={setText} />
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  height: 620px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
`;
