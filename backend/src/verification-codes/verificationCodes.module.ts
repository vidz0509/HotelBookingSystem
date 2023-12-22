import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VerificationCodesCollection } from './schema/verificationCode.collection';
import { VerificationCode,VerificationCodeSchema } from './schema/verificationCode.schema';
import { VerificationCodesService } from './verificationCodes.service';

import { HelpersServices } from '../services/helpers/helpers.services';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: VerificationCode.name,
                schema: VerificationCodeSchema
            },
        ])
    ],
    controllers: [],
    providers: [VerificationCodesService, VerificationCodesCollection, HelpersServices]
})

export class VerificationCodesModule { }