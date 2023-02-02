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
    page: number,
    itemPerPage: number,
  ) {
    const skip = (page - 1) * itemPerPage;
    const reviews = await this.prisma.review.findMany({
      where: {
        itemId: itemId,
      },
      include: {
        users: true,
      },
      orderBy: {
        [orderBy]: order,
      },
      skip: skip,
    });

    const total = await this.prisma.review.count({
      where: {
        itemId: itemId,
      },
    });

    const average = await this.prisma.review.aggregate({
      where: {
        itemId: itemId,
      },
      _avg: {
        evaluation: true,
      },
    });

    return {
      reviews: reviews,
      total: total,
      average: average,
    };
  }

  async getReviewById(reviewId: number) {
    return this.prisma.review.findUnique({
      where: {
        reviewId: reviewId,
      },
      include: {
        item: true,
      },
    });
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

  async selectUserReview(userId: number, id: number): Promise<Review[]> {
    const result = await this.prisma.review.findMany({
      where: {
        userId: userId,
        itemId: id,
      },
    });
    return result;
  }
}
