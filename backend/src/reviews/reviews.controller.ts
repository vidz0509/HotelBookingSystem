import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put, Query, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { Response } from 'express';
import { CreateReviewDto } from './dto/create.dto';
import { ReviewsService } from './reviews.services';

@Controller('reviews')
export class ReviewsController {

    constructor(private readonly reviewService: ReviewsService) { }

    @Post()
    async createReview(@Body() createReviewDto: CreateReviewDto) {
        console.log(createReviewDto);
        return await this.reviewService.createReview(createReviewDto);
    }

    @Get()
    async findAll() {
        return await this.reviewService.getAllReview();
    }

    @Get('/count')
    async getReviewCount(): Promise<number> {
        return this.reviewService.getReviewCount();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.reviewService.getReviewById(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.reviewService.hardDeleteReview(id);
    }
}