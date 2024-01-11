import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Country, CountrySchema, CountriesDocument } from './country.schema'; 

import { CountryCollection } from './country.collection';
import { CountryController } from './country.controller';
import { CountryService } from './country.services'; 

import { HelpersServices } from '../services/helpers/helpers.services';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Country.name,
                schema: CountrySchema
            },
        ]),
    ],
    controllers: [CountryController],
    providers: [CountryService, CountryCollection, HelpersServices],
})

export class CountryModule { }