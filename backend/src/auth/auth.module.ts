import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../users/users.schema';
import { UsersService } from '../users/users.services'; 
import { UsersCollection } from '../users/users.collection';

import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { EmailModule } from '../email/email.module';
import { HelpersServices } from '../services/helpers/helpers.services';
import { VerificationCode, VerificationCodeSchema } from 'src/verification-codes/schema/verificationCode.schema';
import { VerificationCodesService } from 'src/verification-codes/verificationCodes.service';
import { VerificationCodesCollection } from 'src/verification-codes/schema/verificationCode.collection';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: VerificationCode.name,
                schema: VerificationCodeSchema
            }
        ]),
        EmailModule
    ],
    controllers: [AuthController],
    providers: [AuthServices, UsersCollection, UsersService, HelpersServices, VerificationCodesService, VerificationCodesCollection]
})

export class AuthModule { }