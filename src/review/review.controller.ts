import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Review } from '@prisma/client';
import { createReviewDto } from './dto/create-review.dto';
import { updateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':itemId/:orderBy/:order')
  selectReviews(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Param('orderBy') orderBy: string,
    @Param('order') order: string,
  ) {
    return this.reviewService.selectReview(itemId, orderBy, order);
  }

  @Post('add')
  addReview(@Body() dto: createReviewDto): Promise<Review> {
    return this.reviewService.addReview(dto);
  }

  @Patch('update')
  updateReview(@Body() dto: updateReviewDto): Promise<Review> {
    return this.reviewService.updateReview(dto);
  }
}
