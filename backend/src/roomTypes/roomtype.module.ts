import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomType, RoomTypeSchema, RoomTypesDocument } from './roomtype.schema'; 

import { RoomTypeCollection } from './roomtype.collection';
import { RoomTypesController } from './roomtype.controller';
import { RoomTypeService } from './roomtype.services';

import { HelpersServices } from '../services/helpers/helpers.services';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: RoomType.name,
                schema: RoomTypeSchema
            },
        ]),
    ],
    controllers: [RoomTypesController],
    providers: [RoomTypeService, RoomTypeCollection, HelpersServices],
})

export class RoomTypeModule { }