import { Fonts } from '@/utils/GlobalFonts';
import { colors } from '@/utils/GlobalStyles';
import React from 'react';
import { styled } from 'styled-components';
import { ThreeDotsLoadingBar } from '../global/ThreeDotsLoadingBar';
import { Comment } from './Comment';
import { CommentType } from '@/types/Comments';

interface Props {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  reviewInput: string;
  setReviewInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function ReviewAssistant({
  comments,
  setComments,
  reviewInput,
  setReviewInput,
}: Props) {
  const changeCommentIdx = (sort: number, newIdx: number[]) => {
    setComments(
      comments.map((comment) => {
        if (comment.sort == sort) {
          return {
            ...comment,
            idx: newIdx,
          };
        }
        return comment;
      })
    );
  };

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
            idx={comment.idx}
            polarity={comment?.polarity}
            newReviewInput={comment.content}
            reviewInput={reviewInput}
            setReviewInput={setReviewInput}
            changeCommentIdx={changeCommentIdx}
          />
        );
      })}
    </Container>
  );
}

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
