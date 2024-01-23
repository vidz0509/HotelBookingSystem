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

  async getLocationById(id: string) {
    const location = await this.locationCollection.getLocationById(id);
    const response = await this.helper.buildResponse(true, null, location);
    return response;
  }

  async getAllLocations(): Promise<any> {
    let data = await this.locationCollection.getAllLocations();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async deleteLocation(locationId: string) {
    let data = await this.locationCollection.deleteLocation(locationId);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async sortedLocations(order: string): Promise<Location[]> {
    return await this.locationCollection.sortedLocations(order);
  }
}

