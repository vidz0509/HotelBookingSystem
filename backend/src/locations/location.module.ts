import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Location, LocationSchema, LocationsDocument } from './location.schema';

import { LocationCollection } from './location.collection';
import { LocationsController } from './locations.controller';
import { LocationService } from './location.services';

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
                name: Location.name,
                schema: LocationSchema
            },
        ]),
        MulterModule.register({
            dest: './uploads/locationsImg',
            storage: diskStorage({
                destination: './uploads/locationsImg',
                filename: (req, file, callback) => {
                    const originalname = file.originalname.replace(path?.extname(file.originalname), '');
                    callback(null, `${originalname}`);
                },
            }),
        })
    ],
    controllers: [LocationsController],
    providers: [LocationService, LocationCollection, HelpersServices],
})

export class LocationModule { }