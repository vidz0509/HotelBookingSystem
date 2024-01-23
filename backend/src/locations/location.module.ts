import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Location, LocationSchema, LocationsDocument } from './location.schema'; 

import { LocationCollection } from './location.collection';
import { LocationsController } from './locations.controller';
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
    controllers: [LocationsController],
    providers: [LocationService, LocationCollection, HelpersServices],
})

export class LocationModule { }