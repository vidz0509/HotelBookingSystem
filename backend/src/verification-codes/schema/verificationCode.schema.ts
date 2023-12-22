import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type VerificationCodeDocument = HydratedDocument<VerificationCode>;

@Schema()
export class VerificationCode {

    _id: string;

    @IsNotEmpty()
    @Prop({ required: true, type: String })
    verificationCode: string;

    @IsNotEmpty()
    @Prop({ required: true, type: String })
    userId: string;

    @IsNotEmpty()
    @Prop({ required: true, type: Date })
    generationTime: Date;

    @Prop({ type: Boolean })
    isDeleted: boolean;

    @Prop({ type: Boolean })
    deletedAt: Date;
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode);