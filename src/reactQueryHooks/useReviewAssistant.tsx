import { CommentType } from '@/types/Comments';
import axios from 'axios';
import { useMutation } from 'react-query';

const getReviewRecommendations = async (inputData: string) => {
  const { data } = await axios.post(`${process.env.REACT_APP_AI_URL}`, {
    input_prompt: inputData,
  });
  return data;
};

const getReviewComplete = async (inputData: string) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_AI_COMPLETE_URL}`,
    { input_prompt: inputData }
  );
  return data;
};

interface ReviewRecommendations {
  onSuccess: (data: { body: CommentType[]; statusCode: number }) => void;
}

export const useReviewRecommendations = ({
  onSuccess,
}: ReviewRecommendations) => {
  return useMutation(getReviewRecommendations, {
    onSuccess: onSuccess,
    onError: (err) => {
      throw err;
    },
  });
};

export const useReviewComplete = ({ onSuccess }: ReviewRecommendations) => {
  return useMutation(getReviewComplete, {
    onSuccess: onSuccess,
    onError: (err) => {
      throw err;
    },
  });
};
