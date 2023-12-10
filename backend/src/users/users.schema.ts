import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<User>;

@Schema()
export class User {
  
  @Prop()
  FullName: string;

  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop()
  ConfirmPassword: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);