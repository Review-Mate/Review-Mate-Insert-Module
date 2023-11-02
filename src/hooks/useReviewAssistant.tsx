import { CommentType } from '@/types/Comments';
import axios from 'axios';
import { useMutation } from 'react-query';

const getReviewRecommendations = async (inputData: string) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_AI_RECOMMEND_URL}/stage`,
    { input_prompt: inputData }
  );
  return data;
};

interface ReviewRecommendations {
  onSuccess: (data: { body: CommentType; statusCode: number }) => void;
}

export const useReviewRecommendations = ({
  onSuccess,
}: ReviewRecommendations) => {
  return useMutation(getReviewRecommendations, {
    onSuccess: onSuccess,
    onError: () => console.log('리뷰 추천에 실패했습니다.'),
  });
};
