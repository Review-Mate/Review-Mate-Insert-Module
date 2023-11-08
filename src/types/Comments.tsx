import { ReviewAssistType, ReviewPolarity } from '@/config/enum';

export interface CommentType {
  sort: ReviewAssistType;
  content: string;
  idx?: number[];
  polarity?: ReviewPolarity;
}
