import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewEditor from '@/components/ReviewEditor';
import ReviewAssistant from '@/components/ReviewAssistant';
import { Margin } from '@/ui/margin/margin';
import { CommentType } from '@/types/Comments';

export default function ReviewWrite() {
  const [comments, setComments] = useState<CommentType[]>([]);

  return (
    <Container>
      <ReviewEditor comments={comments} setComments={setComments} />
      <Margin margin={'0 0 0 20px'} />
      <ReviewAssistant comments={comments} />
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
`;
