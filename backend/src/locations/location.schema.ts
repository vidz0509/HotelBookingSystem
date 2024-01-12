import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type LocationsDocument = HydratedDocument<Location>;

@Schema()
export class Location {

  _id: string;

  @Prop({ required: true })
  location_name: string;

  @IsNotEmpty()
  @Prop({ required: true })
  location_images: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  isActive: boolean;
}

export const LocationSchema = SchemaFactory.createForClass(Location);