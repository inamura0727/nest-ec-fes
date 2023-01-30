import { Injectable } from '@nestjs/common';
import { Review } from 'types/review';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReviewDto } from './dto/create-review.dto';
import { updateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async selectReview(
    itemId: number,
    orderBy: string,
    order: string,
  ): Promise<{ reviews: Review[]; total: number }> {
    const reviews = await this.prisma.review.findMany({
      where: {
        itemId: itemId,
      },
      orderBy: {
        [orderBy]: order,
      },
    });

    const total = await this.prisma.review.count({
      where: {
        itemId: itemId,
      },
    });

    return {
      reviews: reviews,
      total: total,
    };
  }

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

  async updateReview(dto: updateReviewDto): Promise<Review> {
    return this.prisma.review.update({
      where: {
        reviewId: dto.reviewId,
      },
      data: {
        reviewId: dto.reviewId,
        postTime: dto.postTime,
        reviewTitle: dto.reviewTitle,
        reviewText: dto.reviewText,
        evaluation: dto.evaluation,
        spoiler: dto.spoiler,
      },
    });
  }
}
