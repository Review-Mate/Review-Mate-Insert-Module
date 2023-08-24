import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';
import { Row } from '@/ui/flex/flex';
import Dot from '@/assets/icons/dot.svg';
import { Margin } from '@/ui/margin/margin';
import { CommentType } from '@/types/Comments';
import { COMPLETE, RECOMMEND } from '@/config/constants';

interface Props {
  comments: CommentType[];
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ReviewAssistant(props: Props) {
  const { comments, text, setText } = props;

  const sentenceComplete = (idx1: number, idx2: number, replace: string) => {
    console.log(text.length);
    if (idx2 > text.length || idx2 == -1) idx2 = text.length;
    if (idx2 < idx1 || idx1 < 0) return;

    let newText = text.substring(0, idx1);
    newText += replace;
    newText += text.substring(idx2);
    setText(newText);
  };

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
            idx={comment?.idx}
            content={content}
            sentenceComplete={sentenceComplete}
          />
        ))
      )}
    </Container>
  );
}

const Dots = () => {
  return (
    <React.Fragment>
      <DotIcon alt="." src={Dot} delay={0} />
      <DotIcon alt="." src={Dot} delay={0.1} />
      <DotIcon alt="." src={Dot} delay={0.2} />
      <Margin margin="0 4px 0 0" />
    </React.Fragment>
  );
};

const Comment = ({
  index,
  sort,
  idx,
  content,
  sentenceComplete,
}: {
  index: number;
  sort: number;
  idx?: number[];
  content: string;
  sentenceComplete: (idx1: number, idx2: number, replace: string) => void;
}) => {
  let title;
  if (sort == RECOMMEND) title = '주제 추천';
  if (sort == COMPLETE) title = '이 문장을 쓰려고 하셨나요?';
  return (
    <CommentBox
      index={index}
      sort={sort}
      disabled={sort == RECOMMEND ? true : false}
      onClick={() => {
        if (idx) sentenceComplete(idx[0], idx[1], content);
      }}
    >
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
  overflow-y: auto;
`;

const AIBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${colors.gray06};
  margin-bottom: 10px;
`;

const BoxFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
  }
`;

const CommentBox = styled.button<{ index: number; sort: number }>`
  display: flex;
  flex-direction: column;
  border-color: ${(props) =>
    props.sort == RECOMMEND
      ? colors.gray06
      : props.index == 1
      ? colors.red
      : colors.primary};
  border-width: ${(props) => (props.sort == RECOMMEND ? 1 : 2)}px;
  border-radius: 5px;
  border-style: solid;
  border-radius: 5px;
  padding: 16px 20px;
  margin-top: 10px;
  background-color: ${(props) =>
    props.sort == RECOMMEND
      ? colors.white
      : props.index == 1
      ? colors.lightRed
      : colors.lightBlue};
  animation: ${BoxFadeIn} 0.7s forwards ease-out;
  cursor: ${(props) => (props.sort == 1 ? 'default' : 'pointer')};
`;

const dotJump = keyframes`
  0% {
    margin-bottom: 0px;
  }
  50%{
    margin-bottom: 3px;
  }
  100% {
    margin-bottom: 6px;
  }
`;

const DotIcon = styled.img<{ delay: number }>`
  width: 4px;
  margin-right: 2px;
  margin-bottom: 0px;
  animation-name: ${dotJump};
  animation-duration: 0.7s;
  animation-delay: ${(props) => props.delay}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
`;
