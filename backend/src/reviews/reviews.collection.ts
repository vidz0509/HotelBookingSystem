import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create.dto';
import { Reviews } from './reviews.schema';

@Injectable()
export class ReviewsCollection {

    constructor(@InjectModel('Reviews') private reviewModel: Model<Reviews>) { }

    async getAllReview(): Promise<Reviews[]> {
        return await this.reviewModel.find()
            .sort({
                createdAt: -1
            });
    }

    async getReviewCount(): Promise<number> {
        return await this.reviewModel.countDocuments();
    }

    async getReviewById(id: string): Promise<Reviews> {
        return this.reviewModel.findById(id);
    }

    async createReview(createReviewDto: CreateReviewDto) {
        const newReview = await new this.reviewModel({

            review_text: createReviewDto.review_text,
            user_id: createReviewDto.user_id,
            hotel_id: createReviewDto.hotel_id,
            rating: createReviewDto.rating,

            createdAt: new Date(),
        });
        return newReview.save();
    }

    async hardDeleteReview(reviewId: string) {
        return this.reviewModel.deleteOne({ _id: reviewId });
    }
}