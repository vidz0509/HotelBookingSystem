import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type RoomTypesDocument = HydratedDocument<RoomType>;

@Schema()
export class RoomType {

  @IsNotEmpty()
  @Prop({ required: true })
  roomtype_name: string;

  @IsNotEmpty()
  @Prop({ required: true })
  max_adults: number;

  @IsNotEmpty()
  @Prop({ required: true })
  max_children: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  isActive: boolean;
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);