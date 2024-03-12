import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Rooms, RoomsSchema, RoomsDocument } from './rooms.schema';

import { RoomsCollection } from './rooms.collection';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.services';

import { HotelsService } from 'src/hotels/hotels.services';
import { HotelsCollection } from 'src/hotels/hotels.collection';
import { Hotels, HotelsSchema, HotelsDocument } from 'src/hotels/hotels.schema';

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
                name: Rooms.name,
                schema: RoomsSchema
            },
            {
                name: Hotels.name,
                schema: HotelsSchema
            },
        ]),
        MulterModule.register({
            dest: './uploads/roomsImg',
            storage: diskStorage({
                destination: './uploads/roomsImg',
                filename: (req, file, callback) => {
                    const originalname = file.originalname.replace(path?.extname(file.originalname), '');
                    callback(null, `${originalname}`);
                },
            }),
        })
    ],
    controllers: [RoomsController],
    providers: [RoomsService, RoomsCollection, HotelsCollection, HelpersServices],
})

export class RoomModule { }