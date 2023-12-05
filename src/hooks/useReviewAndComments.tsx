import useInputTimeout from '@/hooks/useInputTimeout';
import { ChangeEvent, useState } from 'react';
import { useReviewRecommendations } from '../reactQueryHooks/useReviewAssistant';
import { CommentType } from '@/types/Comments';

// 리뷰 작성 중인 내용을 관리하는 커스텀 훅
export const useReviewAndComments = () => {
  const [reviewInput, setReviewInput] = useState(''); // 리뷰 작성 중인 내용
  const [comments, setComments] = useState<CommentType[]>([]); // 리뷰 보조 AI가 추천한 문장 리스트

  // 리뷰 작성 중인 내용에 대한 추천 문장 요청
  const { mutate: reviewRecommendMutate } = useReviewRecommendations({
    onSuccess: (data) => {
      console.log(data?.body[0]?.sort);

      setComments(
        comments.filter((comment) => comment.sort !== data?.body[0]?.sort)
      );
      // 나타나는 에니메이션 효과를 위해 0.1초 뒤에 데이터 추가
      setTimeout(() => {
        data?.body?.forEach((comment) => {
          const newComment = { ...comment, visible: true }; // 에니메이션 효과 위해 visible 변수 추가
          setComments((prevComments) => [...prevComments, newComment]);
        });
      }, 100);
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
