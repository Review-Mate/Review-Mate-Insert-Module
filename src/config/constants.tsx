// 리뷰 보조 sort
export const reviewAssist = {
  RECOMMEND: 1,
  COMPLETE: 2,
} as const;

export type ReviewAssistType = (typeof reviewAssist)[keyof typeof reviewAssist];
