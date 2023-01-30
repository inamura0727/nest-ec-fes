import { IsNotEmpty } from 'class-validator';

export class updateReviewDto {
  @IsNotEmpty()
  reviewId: number;

  @IsNotEmpty()
  postTime: string;

  @IsNotEmpty()
  reviewTitle: string;

  @IsNotEmpty()
  reviewText: string;

  @IsNotEmpty()
  evaluation: number;

  @IsNotEmpty()
  spoiler: boolean;
}
