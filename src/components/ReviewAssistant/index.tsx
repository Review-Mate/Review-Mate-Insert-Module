import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';
import { Row } from '@/ui/flex/flex';
import { ReactComponent as Dot } from '@/assets/icons/dot.svg';
import { Margin } from '@/ui/margin/margin';
import { CommentType } from '@/types/Comments';

interface Props {
  comments: CommentType[];
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
      {comments.map((comment) =>
        comment.contents.map((content, index) => (
          <Comment
            key={index}
            index={index}
            sort={comment.sort}
            content={content}
          />
        ))
      )}
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

const Comment = ({
  index,
  sort,
  content,
}: {
  index: number;
  sort: number;
  content: string;
}) => {
  let title;
  if (sort == 1) title = '주제 추천';
  if (sort == 2) title = '이 문장을 쓰려고 하셨나요?';
  return (
    <CommentBox index={index} sort={sort}>
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
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${colors.gray06};
  margin-bottom: 10px;
`;

const BoxFadeIn = keyframes`
  0% {
    opacity: 0;
    margin-top: 100px;
  }
  100% {
    opacity: 1;
  }
`;

const CommentBox = styled.div<{ index: number; sort: number }>`
  display: flex;
  flex-direction: column;
  border-color: ${(props) =>
    props.sort == 1
      ? colors.gray06
      : props.index == 1
      ? colors.red
      : colors.primary};
  border-width: ${(props) => (props.sort == 1 ? 1 : 2)}px;
  border-radius: 5px;
  border-style: solid;
  border-radius: 5px;
  padding: 16px 20px;
  margin-top: 10px;
  background-color: ${(props) =>
    props.sort == 1
      ? colors.white
      : props.index == 1
      ? colors.lightRed
      : colors.lightBlue};
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
