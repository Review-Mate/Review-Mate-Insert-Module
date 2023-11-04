import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { keyframes, styled } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';
import { Row } from '@/ui/flex/flex';
import Dot from '@/assets/icons/dot.svg';
import { Margin } from '@/ui/margin/margin';
import { ReviewWriteStateType } from '@/types/Comments';
import {
  ReviewAssistType,
  ReviewAssist,
  ReviewPolarityType,
} from '@/config/enum';

export default function ReviewAssistant(props: ReviewWriteStateType) {
  const { comments, content, setContent } = props;

  const sentenceComplete = (idx1: number, idx2: number, replace: string) => {
    if (idx2 > content.length || idx2 == -1) idx2 = content.length;
    if (idx2 < idx1 || idx1 < 0) return;

    let newText = content.substring(0, idx1);
    newText += replace;
    newText += content.substring(idx2);
    setContent(newText);
  };

  return (
    <Container>
      <AIBox>
        <Dots />
        <Fonts.caption weight={500} color={colors.gray01}>
          AI가 맞춤 리뷰 작성을 도와드립니다.
        </Fonts.caption>
      </AIBox>
      {comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            sort={comment.sort}
            idx={comment?.idx}
            polarity={comment?.polarity}
            content={comment.content}
            sentenceComplete={sentenceComplete}
          />
        );
      })}
    </Container>
  );
}

interface CommentProps {
  sort: ReviewAssistType;
  polarity?: ReviewPolarityType;
  idx?: number[];
  content: string;
  sentenceComplete: (idx1: number, idx2: number, replace: string) => void;
}

const Comment = ({
  sort,
  polarity,
  idx,
  content,
  sentenceComplete,
}: CommentProps) => {
  let title;
  if (sort == ReviewAssist.RECOMMEND) title = '주제 추천';
  if (sort == ReviewAssist.COMPLETE) title = '이 문장을 쓰려고 하셨나요?';
  return (
    <CommentBox
      sort={sort}
      polarity={polarity}
      disabled={sort == ReviewAssist.RECOMMEND ? true : false}
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
      <Fonts.body3
        color={colors.gray01}
        style={{ lineHeight: '150%', textAlign: 'left' }}
      >
        {content}
      </Fonts.body3>
    </CommentBox>
  );
};

const Dots = () => {
  return (
    <React.Fragment>
      <DotIcon alt="." src={Dot} delay={0} />
      <DotIcon alt="." src={Dot} delay={0.2} />
      <DotIcon alt="." src={Dot} delay={0.4} />
      <Margin margin="0 4px 0 0" />
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  height: 680px;
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
  padding: 8px 10px;
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

const CommentBox = styled.button<{
  sort: ReviewAssistType;
  polarity: ReviewPolarityType;
}>`
  display: flex;
  flex-direction: column;
  border-color: ${(props) =>
    props.sort === ReviewAssist.RECOMMEND
      ? colors.gray06
      : props.polarity
      ? colors.red
      : colors.primary};
  border-width: ${(props) => (props.sort === ReviewAssist.RECOMMEND ? 1 : 2)}px;
  border-radius: 5px;
  border-style: solid;
  border-radius: 5px;
  padding: 16px 20px;
  margin-top: 10px;
  background-color: ${(props) =>
    props.sort === ReviewAssist.RECOMMEND
      ? colors.white
      : props.polarity
      ? colors.lightRed
      : colors.lightBlue};
  animation: ${BoxFadeIn} 0.7s forwards ease-out;
  cursor: ${(props) => (props.sort == 1 ? 'default' : 'pointer')};
`;

const dotJump = keyframes`
  0% {
    margin-bottom: 0px;
  }
  100% {
    margin-bottom: 5px;
  }
`;

const DotIcon = styled.img<{ delay: number }>`
  width: 4px;
  margin-right: 2px;
  animation-name: ${dotJump};
  animation-duration: 0.7s;
  animation-delay: ${(props) => props.delay}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
`;
