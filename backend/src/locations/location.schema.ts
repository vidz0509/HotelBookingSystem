import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type LocationsDocument = HydratedDocument<Location>;

@Schema()
export class Location {

  location_id: string;

  @Prop()
  country_id: string;

  @IsNotEmpty()
  @Prop({ required: true })
  location_code: string;

  @IsNotEmpty()
  @Prop({ required: true })
  location_name: string;

  // @IsNotEmpty()
  // @Prop({ required: true })
  @Prop()
  location_image: string;

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