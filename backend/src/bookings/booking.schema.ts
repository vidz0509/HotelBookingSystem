import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type BookingsDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {

  _id: string;

  @IsNotEmpty()
  @Prop({ required: true })
  check_in: Date;

  @IsNotEmpty()
  @Prop({ required: true })
  check_out: Date;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  hotel_id: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  location_id: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  country_id: string;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  total_rooms: number;

  @IsNumber()
  @IsNotEmpty()
  total_adults: number;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  total_children: number;

  @Prop()
  room_details: any[];

  @Prop()
  user_details: any[];

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  total_amount: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  transaction_id: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  payment_method: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  payment_status: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  booking_status: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  checkout_url: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);