// 리뷰 보조 sort
export const reviewAssist = {
  RECOMMEND: 1,
  COMPLETE: 2,
} as const;

export type ReviewAssistType = (typeof reviewAssist)[keyof typeof reviewAssist];

// 데모 리뷰 조회용 상품 id
export const PARTNER_CUSTOM_PRODUCT_ID = 'PRODUCT-0001';
