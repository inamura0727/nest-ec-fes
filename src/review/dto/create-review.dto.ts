import { IsNotEmpty } from 'class-validator';

export class createReviewDto {
  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  userId: number;

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
