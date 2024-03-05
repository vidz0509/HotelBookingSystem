import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { ReviewsCollection } from './reviews.collection';
import { Reviews } from './reviews.schema';

import { CreateReviewDto } from './dto/create.dto';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);
  constructor(
    private readonly reviewCollection: ReviewsCollection,
    private readonly helper: HelpersServices,
  ) { }

  async createReview(createReviewDto: CreateReviewDto) {
    try {
      const newReview = await this.reviewCollection.createReview(createReviewDto);
      const response = await this.helper.buildResponse(true, null, newReview);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async getAllReview(): Promise<any> {
    let data = await this.reviewCollection.getAllReview();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getReviewCount(): Promise<any> {
    let count = await this.reviewCollection.getReviewCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
  }

  async getReviewById(id: string) {
    const review = await this.reviewCollection.getReviewById(id);
    const response = await this.helper.buildResponse(true, null, review);
    return response;
  }

  async hardDeleteReview(reviewId: string) {
    let data = await this.reviewCollection.hardDeleteReview(reviewId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }
}
