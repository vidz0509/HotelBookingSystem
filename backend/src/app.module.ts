import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { HelpersServices } from './auth/services/helpers/helpers.services';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
  MongooseModule.forRoot(process.env.MONGODB_URI + '/' + process.env.DATABASE_NAME),
  UserModule,
  ProductModule,
  AuthModule
],
controllers: [AppController],
providers: [AppService, HelpersServices],
})

export class AppModule {}
