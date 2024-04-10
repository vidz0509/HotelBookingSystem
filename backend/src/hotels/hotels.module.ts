import { RoomsService } from './../rooms/rooms.services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Hotels, HotelsSchema, HotelsDocument } from './hotels.schema';

import { HotelsCollection } from './hotels.collection';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.services';

import { BookingModule } from 'src/bookings/booking.module';
import { BookingCollection } from 'src/bookings/booking.collection';
import { BookingService } from 'src/bookings/booking.services';

import { HelpersServices } from '../services/helpers/helpers.services';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { ConfigModule } from '@nestjs/config';
import { Booking, BookingSchema } from 'src/bookings/booking.schema';
import { Rooms, RoomsSchema, RoomsDocument } from 'src/rooms/rooms.schema';
import { RoomsCollection } from 'src/rooms/rooms.collection';
import { Amenities, AmenitiesSchema } from 'src/amenities/amenities.schema';
import { AmenitiesCollection } from 'src/amenities/amenities.collection';
import { UsersCollection } from 'src/users/users.collection';
import { User, UserSchema } from 'src/users/users.schema';
import { EmailService } from 'src/email/email.service';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            {
                name: Hotels.name,
                schema: HotelsSchema
            },
            {
                name: Booking.name,
                schema: BookingSchema
            },
            {
                name: Rooms.name,
                schema: RoomsSchema
            },
            {
                name: Amenities.name,
                schema: AmenitiesSchema
            },
            {
                name: User.name,
                schema: UserSchema
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
    providers: [HotelsService, HotelsCollection, BookingService, BookingCollection,UsersCollection,RoomsService,RoomsCollection, AmenitiesCollection,HelpersServices, EmailService],
})

export class HotelModule { }