import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CountriesDocument = HydratedDocument<Country>;

@Schema()
export class Country {

  _id: string;

  @IsNotEmpty()
  @Prop({ required: true })
  country_code: string;

  @IsNotEmpty()
  @Prop({ required: true })
  country_name: string;

  // @IsNotEmpty()
  @Prop()
  country_image: string;

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