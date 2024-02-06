import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Country, CountrySchema, CountriesDocument } from './country.schema';

import { CountryCollection } from './country.collection';
import { CountryController } from './country.controller';
import { CountryService } from './country.services';

import { HelpersServices } from '../services/helpers/helpers.services';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
      ConfigModule,
        MongooseModule.forFeature([
            {
                name: Country.name,
                schema: CountrySchema
            },
        ]),
        MulterModule.register({
            dest: './uploads/countriesImg',
            storage: diskStorage({
              destination: './uploads/countriesImg',
              filename: (req, file, callback) => {
                const originalname = file.originalname.replace(path?.extname(file.originalname), '');
                callback(null, `${originalname}`);
              },
            }),
          })
    ],
    controllers: [CountryController],
    providers: [CountryService, CountryCollection, HelpersServices],
})

export class CountryModule { }