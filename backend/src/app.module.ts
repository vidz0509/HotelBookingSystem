import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './countries/country.module';
import { LocationModule } from './locations/location.module';
import { HotelModule } from './hotels/hotels.module';
import { RoomTypeModule } from './roomTypes/roomtype.module';
import { RoomModule } from './rooms/rooms.module';
import { OfferModule } from './offers/offers.module';
import { ReviewModule } from './reviews/reviews.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { BookingModule } from './bookings/booking.module';

import { ConfigModule } from '@nestjs/config';
import { HelpersServices } from './services/helpers/helpers.services';
import { EmailModule } from './email/email.module';
import { VerificationCodesModule } from './verification-codes/verificationCodes.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
  MongooseModule.forRoot(process.env.MONGODB_URI + '/' + process.env.DATABASE_NAME),
  UserModule,
  CountryModule,
  LocationModule,
  HotelModule,
  RoomTypeModule,
  RoomModule,
  OfferModule,
  ReviewModule,
  BookingModule,
  ProductModule,
  AmenitiesModule,
  EmailModule,
  VerificationCodesModule,
  AuthModule
],
controllers: [AppController],
providers: [AppService, HelpersServices],
})

export class AppModule {}
