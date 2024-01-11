import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CountriesDocument = HydratedDocument<Country>;

@Schema()
export class Country {

  _id: string;

  @Prop({ required: true })
  country_name: string;

  @IsNotEmpty()
  @Prop({ required: true })
  country_images: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  isActive: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);