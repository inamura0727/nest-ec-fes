type Review = {
  reviewId: number;
  itemId: number;
  userId: number;
  postTime: string;
  reviewTitle: string;
  reviewText: string;
  evaluation: number;
  spoiler: boolean;
};

export { Review };
