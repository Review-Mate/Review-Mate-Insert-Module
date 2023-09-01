import { ReviewAssistType } from '@/config/constants';

export interface CommentType {
  sort: ReviewAssistType;
  idx?: number[];
  contents: string[];
}
