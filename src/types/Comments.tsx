import { ReviewAssistType } from '@/config/enum';

export interface CommentType {
  sort: ReviewAssistType;
  idx?: number[];
  contents: string[];
}

export interface ReviewWriteStateType {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
