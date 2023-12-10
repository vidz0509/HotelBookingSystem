import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../users/users.schema';
import { UsersService } from '../users/users.services'; 
import { UsersCollection } from '../users/users.collection';

import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { HelpersServices } from '../services/helpers/helpers.services';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
        ]),
        // JwtModule.register({
        //     global: true,
        //     secret: jwtConstants.secret,
        //     signOptions: { expiresIn: '3600s' },
        // }),
    ],
    controllers: [AuthController],
    providers: [AuthServices, UsersCollection, UsersService]
})

export class AuthModule { }