import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateCountryDto } from './dto/create.dto';
import { CountryService } from './country.services';
import { UpdateCountryDto } from './dto/update.dto';

@Controller('countries')
export class CountryController {

    constructor(private readonly countryService: CountryService) { }

    @Post()
    async createCountry(@Body() createCountryDto: CreateCountryDto) {
        console.log(createCountryDto);
        return await this.countryService.createCountry(createCountryDto);
    }

    @Put(':id')
    async updateCountry(@Param('id') id: string,
        @Body() updateCountryDto: UpdateCountryDto) {
        return this.countryService.updateCountry(id, updateCountryDto);
    }

    @Get()
    async findAll() {
        return await this.countryService.getAllCountry();
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.countryService.deleteCountry(id);
    }

    @Get('/sortcountries')
    async sortedCountries(@Query('order') order: string) {
      return await this.countryService.sortedCountries(order);
    }
}