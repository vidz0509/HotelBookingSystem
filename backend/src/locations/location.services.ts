import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { LocationCollection } from './location.collection';
import { Location } from './location.schema';

import { CreateLocationDto } from './dto/create.dto';
import { UpdateLocationDto } from './dto/update.dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  constructor(
    private readonly locationCollection: LocationCollection,
    private readonly helper: HelpersServices,
  ) { }

  async getAllLocations(size?: number): Promise<any> {
    let data = await this.locationCollection.getAllLocations(size);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getLocationsCount(): Promise<any> {
    let count = await this.locationCollection.getLocationsCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
  }

  async sortedLocations(order: string): Promise<Location[]> {
    return await this.locationCollection.sortedLocations(order);
  }

  async getLocationById(id: string) {
    const location = await this.locationCollection.getLocationById(id);
    const response = await this.helper.buildResponse(true, null, location);
    return response;

  }
  async getLocationByCountry(countryId: string): Promise<any> {
    const country = await this.locationCollection.getLocationByCountry(countryId);
    const response = await this.helper.buildResponse(true, null, country);
    return response;
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    const isLocationExists = await this.checkIfLocationExists(createLocationDto.location_name);
    if (isLocationExists) {
      throw new ConflictException(
        await this.helper.buildResponse(false, `Country is already Exists.`),
      );
    }
    try {
      await this.locationCollection.createLocation(createLocationDto);
      const newLocation = await this.locationCollection.getLocationByName(createLocationDto.location_name);
      const response = await this.helper.buildResponse(true, null, newLocation);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async checkIfLocationExists(location_name: string) {
    const country = await this.locationCollection.getLocationByName(location_name);
    return country;
  }

  async updateLocation(userId: string, updateLocationDto: UpdateLocationDto) {
    let data = await this.locationCollection.updateLocation(userId, updateLocationDto);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async updateStatus(LocationID: string, status: number) {
    console.log(LocationID)
    let data = await this.locationCollection.updateStatus(LocationID, status);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async softDeleteLocation(locationId: string) {
    console.log(locationId)
    let data = await this.locationCollection.softDeleteLocation(locationId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async hardDeleteLocation(locationId: string) {
    let data = await this.locationCollection.hardDeleteLocation(locationId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async uploadImg(locationId: string, file: Express.Multer.File) {
    const locationsImage = `${process.env.APP_URL}/locations/uploads/locationsImg/${file.filename}`;
    let data = await this.locationCollection.uploadLocationsImg(locationId, locationsImage);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
    // return { message: 'File uploaed successfully', url: frontendUrl };
  }

}

