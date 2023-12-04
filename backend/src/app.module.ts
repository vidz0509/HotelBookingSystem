import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/usres.module';


import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
  MongooseModule.forRoot(process.env.MONGODB_URI + '/' + process.env.DATABASE_NAME),
  UserModule
],
controllers: [AppController],
providers: [AppService],
})

export class AppModule {}
