export type ReviewType = {
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
};
