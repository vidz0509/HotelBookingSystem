import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type HotelsDocument = HydratedDocument<Hotels>;

@Schema()
export class Hotels {

  hotel_id: string;

  @Prop()
  location_id: string;

  @Prop()
  country_id: string;
  
  @Prop()
  roomTypes: string[];
  
  @Prop()
  amenities: string[];

  @IsNotEmpty()
  @Prop({ required: true })
  hotel_name: string;

  @IsNotEmpty()
  @Prop({ required: true })

  hotel_code: string;
  
  @Prop()
  hotel_address: string;
  
  @Prop()
  average_rating: string;

  @Prop()
  hotel_image: string[];

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

export const HotelsSchema = SchemaFactory.createForClass(Hotels);