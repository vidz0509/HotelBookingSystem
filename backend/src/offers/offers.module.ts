import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Offers, OffersSchema, OffersDocument } from './offers.schema';

import { OffersCollection } from './offers.collection';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.services';

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
                name: Offers.name,
                schema: OffersSchema
            },
        ]),
        MulterModule.register({
            dest: './uploads/offersImg',
            storage: diskStorage({
                destination: './uploads/offersImg',
                filename: (req, file, callback) => {
                    const originalname = file.originalname.replace(path?.extname(file.originalname), '');
                    callback(null, `${originalname}`);
                },
            }),
        })
    ],
    controllers: [OffersController],
    providers: [OffersService, OffersCollection, HelpersServices],
})

export class OfferModule { }