import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  ProductName: string;

  @Prop()
  ProductPrice: number;

  @Prop()
  ProductStock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);