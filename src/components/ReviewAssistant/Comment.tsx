import {
  ReviewAssist,
  ReviewAssistType,
  ReviewPolarityType,
} from '@/config/enum';
import { Row } from '@/ui/flex/flex';
import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React, { Dispatch, SetStateAction } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as AIBot } from '@/assets/icons/aibot.svg';

interface CommentProps {
  sort: ReviewAssistType;
  polarity?: ReviewPolarityType;
  idx?: number[];
  reviewInput: string;
  setReviewInput: Dispatch<SetStateAction<string>>;
  newReviewInput: string;
  changeCommentIdx: (sort: number, newIdx: number[]) => void;
}

export const Comment = ({
  sort,
  polarity,
  idx,
  reviewInput,
  setReviewInput,
  newReviewInput,
  changeCommentIdx,
}: CommentProps) => {
  let title;
  if (sort == ReviewAssist.RECOMMEND) title = '주제 추천';
  if (sort == ReviewAssist.COMPLETE) title = '이 문장을 쓰려고 하셨나요?';

  const sentenceComplete = () => {
    if (!idx) return;

    const idx1 = idx[0];
    let idx2 = idx[1];
    if ((idx2 !== -1 && idx2 < idx1) || idx1 < 0) return;
    if (idx2 > idx1 + reviewInput.length) idx2 = idx1 + newReviewInput.length;

    let newText = reviewInput.substring(0, idx1);
    newText += newReviewInput;
    if (idx2 !== -1) newText += reviewInput.substring(idx2);

    // 변경된 idx 적용
    changeCommentIdx(sort, [idx1, idx2]);

    setReviewInput(newText);
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
        {newReviewInput}
      </Fonts.body3>
    </CommentBox>
  );
};

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
