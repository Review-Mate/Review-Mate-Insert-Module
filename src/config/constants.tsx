import { ReviewSort } from './enum';

// 데모 리뷰 조회용 상품 id
export const PARTNER_CUSTOM_PRODUCT_ID = 'PRODUCT-0001';

// 리뷰 정렬 옵션
export const SORT_OPTIONS = [
  { id: 0, title: '최신순', label: ReviewSort.LATEST },
  { id: 1, title: '별점높은순', label: ReviewSort.RATING_DESC },
  { id: 2, title: '별점낮은순', label: ReviewSort.RATING_ASC },
  { id: 3, title: '긍정률순', label: ReviewSort.POSITIVE_DESC },
  { id: 4, title: '부정률순', label: ReviewSort.NEGATIVE_DESC },
];
