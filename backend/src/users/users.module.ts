import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.services';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersCollection } from './users.collection';
import { HelpersServices } from 'src/services/helpers/helpers.services';
import path, { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads/userProfiles',
      storage: diskStorage({
        destination: './uploads/userProfiles',
        filename: (req, file, callback) => {
          const originalname = file.originalname.replace(path?.extname(file.originalname), '');
          callback(null, `${originalname}`);
        },
      }),
    })
  ],

  controllers: [UsersController],
  providers: [UsersService, UsersCollection, HelpersServices]
})

export class UserModule { }