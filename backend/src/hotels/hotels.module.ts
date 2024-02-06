import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Hotels, HotelsSchema, HotelsDocument } from './hotels.schema';

import { HotelsCollection } from './hotels.collection';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.services';

import { HelpersServices } from '../services/helpers/helpers.services';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Hotels.name,
                schema: HotelsSchema
            },
        ]),
        MulterModule.register({
            dest: './uploads/hotelsImg',
            storage: diskStorage({
                destination: './uploads/hotelsImg',
                filename: (req, file, callback) => {
                    const originalname = file.originalname.replace(path?.extname(file.originalname), '');
                    callback(null, `${originalname}`);
                },
            }),
        })
    ],
    controllers: [HotelsController],
    providers: [HotelsService, HotelsCollection, HelpersServices],
})

export class HotelModule { }