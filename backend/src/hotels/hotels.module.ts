import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Hotels, HotelsSchema, HotelsDocument } from './hotels.schema'; 

import { HotelsCollection } from './hotels.collection';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.services';

import { HelpersServices } from '../services/helpers/helpers.services';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Hotels.name,
                schema: HotelsSchema
            },
        ]),
    ],
    controllers: [HotelsController],
    providers: [HotelsService, HotelsCollection, HelpersServices],
})

export class HotelModule { }