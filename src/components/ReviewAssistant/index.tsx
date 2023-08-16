import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';
import { Row } from '@/ui/flex/flex';
import { ReactComponent as Dot } from '@/assets/icons/dot.svg';
import { Margin } from '@/ui/margin/margin';

interface Props {
  comments: {
    title: string;
    content: string;
  }[];
}

export default function ReviewAssistant(props: Props) {
  const { comments } = props;

  return (
    <Container>
      <AIBox>
        <Dots />
        <Fonts.caption weight={500} color={colors.gray01}>
          AI가 맞춤 리뷰 작성을 도와드립니다.
        </Fonts.caption>
      </AIBox>
      {comments.map((comment, index) => (
        <Comment key={index} title={comment.title} content={comment.content} />
      ))}
    </Container>
  );
}

const Dots = () => {
  return (
    <React.Fragment>
      <Loading delay={0}>
        <Dot />
      </Loading>
      <Loading delay={0.1}>
        <Dot />
      </Loading>
      <Loading delay={0.2}>
        <Dot />
      </Loading>
      <Margin margin="0 4px 0 0" />
    </React.Fragment>
  );
};

const Comment = ({ title, content }: { title: string; content: string }) => {
  return (
    <CommentBox>
      <Row margin="0 0 6px 0">
        <AIBot style={{ width: 30 }} />
        <Fonts.body3 weight={500} margin="0 0 0 5px">
          {title}
        </Fonts.body3>
      </Row>
      <Fonts.body3 color={colors.gray01} style={{ lineHeight: '150%' }}>
        {content}
      </Fonts.body3>
    </CommentBox>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 200px;
  background-color: ${colors.gray08};
  padding: 20px;
`;

const AIBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 5px;
  background-color: ${colors.gray06};
  margin-bottom: 10px;
`;

const BoxFadeIn = keyframes`
  0% {
    opacity: 0;
    margin-top: 300px;
  }
  100% {
    opacity: 1;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray06};
  border-radius: 5px;
  padding: 16px 20px;
  margin-top: 10px;
  background-color: ${colors.white};
  animation: ${BoxFadeIn} 0.7s forwards ease-out;
`;

const dotJump = keyframes`
  0% {
    margin-bottom: 10px;
  }
  100% {
    margin-bottom: 6px;
  }
`;

const Loading = styled.div<{ delay: number }>`
  margin-right: 2px;
  margin-bottom: 6px;
  animation-name: ${dotJump};
  animation-duration: 0.7s;
  animation-delay: ${(props) => props.delay}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
`;
