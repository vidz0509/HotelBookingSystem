import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type OffersDocument = HydratedDocument<Offers>;

@Schema()
export class Offers {

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  offer_type: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  offer_code: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  offer_amount: string;

  @IsNotEmpty()
  @Prop({ required: true })
  isOneTime: boolean;

  @IsOptional()
  @Prop()
  expired_on: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  isActive: boolean;
}

export const OffersSchema = SchemaFactory.createForClass(Offers);