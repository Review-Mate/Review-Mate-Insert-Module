import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewEditor from '@/components/ReviewEditor';
import ReviewAssistant from '@/components/ReviewAssistant';
import { Margin } from '@/ui/margin/margin';

export default function ReviewWrite() {
  return (
    <Container>
      <ReviewEditor />
      <Margin margin={'0 0 0 20px'} />
      <ReviewAssistant />
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
`;
