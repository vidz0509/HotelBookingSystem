import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type ReviewsDocument = HydratedDocument<Reviews>;

@Schema()
export class Reviews {

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  review_text: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  hotel_id: string;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  rating: number;

  @Prop()
  createdAt: Date;

}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);