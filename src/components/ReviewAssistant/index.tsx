import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';
import { Row } from '@/ui/flex/flex';
import { ReviewWriteStateType } from '@/types/Comments';
import {
  ReviewAssistType,
  ReviewAssist,
  ReviewPolarityType,
} from '@/config/enum';
import useInputTimeout from '@/hooks/useInputTimeout';
import { useReviewRecommendations } from '@/hooks/useReviewAssistant';
import { ThreeDotsLoadingBar } from '../global/ThreeDotsLoadingBar';

export default function ReviewAssistant({
  comments,
  setComments,
  content,
  setContent,
}: ReviewWriteStateType) {
  const [lastAssistedIdx, setLastAssistedIdx] = useState(0);

  const { mutate: reviewRecommendMutate } = useReviewRecommendations({
    onSuccess: (data) => {
      data.body.forEach((comment) => {
        setComments([...comments, comment]);
      });
    },
  });

  // 1초간 입력이 없을 경우 실행
  useInputTimeout(1000, () => {
    reviewRecommendMutate(content.substring(lastAssistedIdx));
    console.log(content.substring(lastAssistedIdx));
  });

  return (
    <Container>
      <AIBox>
        <ThreeDotsLoadingBar />
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
            content={content}
            setContent={setContent}
            newContent={comment.content}
            lastAssistedIdx={lastAssistedIdx}
            setLastAssistedIdx={setLastAssistedIdx}
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
  setContent: Dispatch<SetStateAction<string>>;
  newContent: string;
  lastAssistedIdx: number;
  setLastAssistedIdx: Dispatch<SetStateAction<number>>;
}

const Comment = ({
  sort,
  polarity,
  idx,
  content,
  setContent,
  newContent,
  lastAssistedIdx,
  setLastAssistedIdx,
}: CommentProps) => {
  let title;
  if (sort == ReviewAssist.RECOMMEND) title = '주제 추천';
  if (sort == ReviewAssist.COMPLETE) title = '이 문장을 쓰려고 하셨나요?';

  const sentenceComplete = () => {
    if (!idx) return;

    const idx1 = idx[0];
    let idx2 = idx[1];
    if (idx2 > content.length || idx2 == -1) idx2 = idx1 + newContent.length;
    if (idx2 < idx1 || idx1 < 0) return;

    let newText = content.substring(0, lastAssistedIdx + idx1);
    newText += newContent;
    newText += content.substring(lastAssistedIdx + idx2);

    setContent(newText);
    setLastAssistedIdx(lastAssistedIdx + idx2);
  };

  return (
    <CommentBox
      sort={sort}
      polarity={polarity}
      onClick={sort == ReviewAssist.COMPLETE ? sentenceComplete : undefined}
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
        {newContent}
      </Fonts.body3>
    </CommentBox>
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
