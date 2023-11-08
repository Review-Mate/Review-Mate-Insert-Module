import useInputTimeout from '@/hooks/useInputTimeout';
import { ChangeEvent, useState } from 'react';
import { useReviewRecommendations } from '../reactQueryHooks/useReviewAssistant';
import { CommentType } from '@/types/Comments';

// 정의 : 리뷰 작성 중인 내용과 마지막으로 추천받은 인덱스를 관리하는 커스텀 훅
export const useReviewAndComments = () => {
  const [reviewInput, setReviewInput] = useState(''); // 리뷰 작성 중인 내용
  const [comments, setComments] = useState<CommentType[]>([]); // 리뷰 보조 AI가 추천한 문장 리스트

  // 리뷰 작성 중인 내용에 대한 추천 문장 요청
  const { mutate: reviewRecommendMutate } = useReviewRecommendations({
    onSuccess: (data) => {
      data?.body?.forEach((comment) => {
        setComments((prevComments) => [...prevComments, comment]);
      });
    },
  });

  // 1초간 입력이 없을 경우 실행
  const resetInputTimeout = useInputTimeout(1000, () => {
    reviewRecommendMutate(reviewInput);
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInput(e.target.value);
    resetInputTimeout(); // 입력 들어올 때 마다 time 초기화
  };

  return {
    reviewInput,
    setReviewInput,
    comments,
    setComments,
    handleInputChange,
  };
};
