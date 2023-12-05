import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.services';
import { UsersCollection } from './users.collection';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
        ])
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersCollection]
})

export class UserModule { }