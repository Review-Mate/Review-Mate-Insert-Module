import { ReviewAssistType, ReviewPolarity } from '@/config/enum';

export interface CommentType {
  sort: ReviewAssistType;
  content: string;
  idx?: number[];
  polarity?: ReviewPolarity;
}

export interface ReviewWriteStateType {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
