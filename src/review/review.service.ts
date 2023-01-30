import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async addReview(dto: createReviewDto): Promise<Review> {
    return this.prisma.review.create({
      data: {
        itemId: dto.itemId,
        userId: dto.userId,
        postTime: dto.postTime,
        reviewTitle: dto.reviewTitle,
        reviewText: dto.reviewText,
        evaluation: dto.evaluation,
        spoiler: dto.spoiler,
      },
    });
  }
}
