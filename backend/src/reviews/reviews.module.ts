import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Reviews, ReviewsSchema, ReviewsDocument } from './reviews.schema';

import { ReviewsCollection } from './reviews.collection';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.services';

import { HelpersServices } from '../services/helpers/helpers.services';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            {
                name: Reviews.name,
                schema: ReviewsSchema
            },
        ]),
        MulterModule.register({
            dest: './uploads/reviewsImg',
            storage: diskStorage({
                destination: './uploads/reviewsImg',
                filename: (req, file, callback) => {
                    const originalname = file.originalname.replace(path?.extname(file.originalname), '');
                    callback(null, `${originalname}`);
                },
            }),
        })
    ],
    controllers: [ReviewsController],
    providers: [ReviewsService, ReviewsCollection, HelpersServices],
})

export class ReviewModule { }