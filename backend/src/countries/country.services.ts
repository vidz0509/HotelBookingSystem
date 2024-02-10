import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { CountryCollection } from './country.collection';
import { Country } from './country.schema';

import { CreateCountryDto } from './dto/create.dto';
import { UpdateCountryDto } from './dto/update.dto';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);
  constructor(
    private readonly countryCollection: CountryCollection,
    private readonly helper: HelpersServices,
  ) { }

  async getAllCountry(): Promise<any> {
    let data = await this.countryCollection.getAllCountry();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getCountryCount(): Promise<any> {
    let count = await this.countryCollection.getCountryCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
  }

  async createCountry(createCountryDto: CreateCountryDto) {
    const isCountryExists = await this.checkIfCountryExists(createCountryDto.country_name);
    if (isCountryExists) {
      throw new ConflictException(
        await this.helper.buildResponse(false, `Country is already Exists.`),
      );
    }
    try {
      await this.countryCollection.createCountry(createCountryDto);
      const newCountry = await this.countryCollection.getCountryByName(createCountryDto.country_name);
      const response = await this.helper.buildResponse(true, null, newCountry);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async checkIfCountryExists(country_name: string) {
    const country = await this.countryCollection.getCountryByName(country_name);
    return country;
  }

  async updateCountry(countryId: string, updateCountryDto: UpdateCountryDto) {
    let data = await this.countryCollection.updateCountry(countryId, updateCountryDto);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async updateStatus(countryId: string, status: number) {
    console.log(countryId)
    let data = await this.countryCollection.updateStatus(countryId, status);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async sortedCountries(order: string): Promise<Country[]> {
    return await this.countryCollection.sortedCountries(order);
  }

  async getCountryById(id: string) {
    const country = await this.countryCollection.getCountryById(id);
    const response = await this.helper.buildResponse(true, null, country);
    return response;
  }


  async softDeleteCountry(countryId: string) {
    console.log(countryId)
    let data = await this.countryCollection.softDeleteCountry(countryId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async hardDeleteCountry(countryId: string) {
    let data = await this.countryCollection.hardDeleteCountry(countryId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async uploadImage(countryId: string, file: Express.Multer.File) {
    const countriesImage = `${process.env.APP_URL}/countries/uploads/countriesImg/${file.filename}`;
    let data = await this.countryCollection.uploadCountriesImg(countryId, countriesImage);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

}
