// 리뷰 보조 - 문장 추천 or 문장 완성
export enum ReviewAssist {
  RECOMMEND = 1,
  COMPLETE = 2,
}

export type ReviewAssistType = keyof typeof ReviewAssist | number;

// 리뷰 목록 정렬
export enum ReviewSort {
  LATEST = 'LATEST',
  RATING_DESC = 'RATING_DESC',
  RATING_ASC = 'RATING_ASC',
  POSITIVE_DESC = 'POSITIVE_DESC',
  NEGATIVE_DESC = 'NEGATIVE_DESC',
}

export type ReviewSortType = keyof typeof ReviewSort;

// 리뷰 속성
export enum ReviewProperty {
  KINDNESS = 1,
  LOCATION = 2,
  CLEANNESS = 3,
}

export type ReviewPropertyType = keyof typeof ReviewProperty | number;
