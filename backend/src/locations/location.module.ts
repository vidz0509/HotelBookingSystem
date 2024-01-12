import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Location, LocationSchema, LocationsDocument } from './location.schema'; 

import { LocationCollection } from './location.collection';
import { LocationController } from './location.controller';
import { LocationService } from './location.services';

import { HelpersServices } from '../services/helpers/helpers.services';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Location.name,
                schema: LocationSchema
            },
        ]),
    ],
    controllers: [LocationController],
    providers: [LocationService, LocationCollection, HelpersServices],
})

export class LocationModule { }