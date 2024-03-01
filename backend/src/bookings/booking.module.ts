import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Booking, BookingSchema, BookingsDocument } from './booking.schema';

import { BookingCollection } from './booking.collection';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.services';

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
        name: Booking.name,
        schema: BookingSchema
      },
    ]),
    MulterModule.register({
      dest: './uploads/countriesImg',
      storage: diskStorage({
        destination: './uploads/countriesImg',
        filename: (req, file, callback) => {
          const originalname = file.originalname.replace(path?.extname(file.originalname), '');
          callback(null, `${originalname}`);
        },
      }),
    })
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingCollection, HelpersServices],
})

export class BookingModule { }