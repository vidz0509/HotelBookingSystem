import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { VerificationCode, VerificationCodeDocument } from './verificationCode.schema';
import { CreateCodeDto } from '../dto/create.dto';

@Injectable()
export class VerificationCodesCollection {

    constructor(@InjectModel('VerificationCode') private verificationCodeModel: Model<VerificationCode>) { }

    async generateCode(createCodeDto: CreateCodeDto): Promise<VerificationCodeDocument> {
        return await this.verificationCodeModel.findOneAndUpdate({ userId: createCodeDto.userId }, createCodeDto, {
            upsert: true,
            new: true,
            runValidators: true
        });
    }

    async getCode(userId: string) {
        return await this.verificationCodeModel.findOne({
            userId: userId,
        });
    }

    async deleteCode(userId: string) {
        return this.verificationCodeModel.findOneAndUpdate(
            { userId: userId },
            { $set: { deletedAt: new Date(), isDeleted: true } },
            { new: true },
        );
    }
}
