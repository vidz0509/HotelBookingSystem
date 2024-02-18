import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type RoomsDocument = HydratedDocument<Rooms>;

@Schema()
export class Rooms {

  room_id: string;

  @Prop()
  hotel_id: string;

  @Prop()
  room_type_id: string;

  @Prop()
  room_image: string;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  total_rooms: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  isActive: boolean;
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);