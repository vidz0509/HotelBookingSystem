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

  @Put('/updatestatus/:id/:status')
  async updateStatus(@Param('id') id: string, @Param('status') status: number) {
    return this.countryService.updateStatus(id, status);
  }

  @Get('/sortcountries')
  async sortedCountries(@Query('order') order: string) {
    return await this.countryService.sortedCountries(order);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.countryService.getCountryById(id);
  }

  @Get()
  async findAll() {
    return await this.countryService.getAllCountry();
  }

  @Put('/softdelete/:id')
  async softDelete(@Param('id') id: string) {
    return this.countryService.softDeleteCountry(id);
  }

  @Delete(':id')
  async hardDelete(@Param('id') id: string) {
    return this.countryService.hardDeleteCountry(id);
  }
}