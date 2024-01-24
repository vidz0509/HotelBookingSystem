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

  @IsNotEmpty()
  @Prop({ required: true })
  hotel_name: string;

  @IsNotEmpty()
  @Prop({ required: true })
  hotel_address: string;
  
  average_rating: string;

  hotel_image: string[];

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