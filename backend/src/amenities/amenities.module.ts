import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Amenities, AmenitiesSchema, AmenitiessDocument } from './amenities.schema'; 

import { AmenitiesCollection } from './amenities.collection';
import { AmenitiessController } from './amenities.controller';
import { AmenitiesService } from './amenities.services';

import { HelpersServices } from '../services/helpers/helpers.services';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Amenities.name,
                schema: AmenitiesSchema
            },
        ]),
    ],
    controllers: [AmenitiessController],
    providers: [AmenitiesService, AmenitiesCollection, HelpersServices],
})

export class AmenitiesModule { }