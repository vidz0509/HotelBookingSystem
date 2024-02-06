import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateCountryDto } from './dto/create.dto';
import { CountryService } from './country.services';
import { UpdateCountryDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('countries')
export class CountryController {

  constructor(private readonly countryService: CountryService) { }

  @Post()
  async createCountry(@Body() createCountryDto: CreateCountryDto) {
    console.log(createCountryDto);
    return await this.countryService.createCountry(createCountryDto);
  }

  @Get()
  async findAll() {
    return await this.countryService.getAllCountry();
  }

  @Get('/count')
  async getCountryCount(): Promise<number> {
    return this.countryService.getCountryCount();
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

  @Put('/softdelete/:id')
  async softDelete(@Param('id') id: string) {
    return this.countryService.softDeleteCountry(id);
  }

  @Delete(':id')
  async hardDelete(@Param('id') id: string) {
    return this.countryService.hardDeleteCountry(id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const frontendUrl = `${process.env.APP_URL}/countries/uploads/countriesImg/${file.filename}`;
    return { message: 'File uploaed successfully', url: frontendUrl };
  }

  @Get('uploads/countriesImg/:filename')
  async serveFile(@Param('filename') filname: string, @Res() res: Response) {
    return res.sendFile(filname, { root: 'uploads/countriesImg' });
  }

}