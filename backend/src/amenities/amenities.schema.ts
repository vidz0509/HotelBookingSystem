import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type AmenitiessDocument = HydratedDocument<Amenities>;

@Schema()
export class Amenities {

  @IsNotEmpty()
  @Prop({ required: true })
  amenities_name: string;

  @Prop({ required: true })
  amenities_icon: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  isActive: boolean;
}

export const AmenitiesSchema = SchemaFactory.createForClass(Amenities);