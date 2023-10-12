export interface ReviewType {
  id: number;
  rating: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  polarity: string;
  reviewHighlightPairResponses: [
    {
      startIndex: number;
      endIndex: number;
    }
  ];
}

export interface PageableType {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface ReviewListSortType {
  content: ReviewType[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableType;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface TagStatsType {
  reviewProperty: string;
  positiveCount: number;
  negativeCount: number;
}

export interface ReviewStatsType {
  averageRating: number;
  reviewCount: number;
  fiveStarRatingCount: number;
  fourStarRatingCount: number;
  threeStarRatingCount: number;
  twoStarRatingCount: number;
  oneStarRatingCount: number;
}
