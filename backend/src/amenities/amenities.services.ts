import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { AmenitiesCollection } from './amenities.collection';
import { Amenities } from './amenities.schema';

import { CreateAmenitiesDto } from './dto/create.dto';
import { UpdateAmenitiesDto } from './dto/update.dto';

@Injectable()
export class AmenitiesService {
  private readonly logger = new Logger(AmenitiesService.name);
  constructor(
    private readonly amenitiesCollection: AmenitiesCollection,
    private readonly helper: HelpersServices,
  ) { }

  async createAmenities(createAmenitiesDto: CreateAmenitiesDto) {
    const isAmenitiesExists = await this.checkIfAmenitiesExists(createAmenitiesDto.amenities_name);
    if (isAmenitiesExists) {
      throw new ConflictException(
        await this.helper.buildResponse(false, `Amenities is already Exists.`),
      );
    }
    try {
      await this.amenitiesCollection.createAmenities(createAmenitiesDto);
      const newAmenities = await this.amenitiesCollection.getAmenitiesByName(createAmenitiesDto.amenities_name);
      const response = await this.helper.buildResponse(true, null, newAmenities);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }
  
  async getAllAmenities(): Promise<any> {
    let data = await this.amenitiesCollection.getAllAmenities();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }
  
  async getAmenitiesCount(): Promise<any> {
    let count = await this.amenitiesCollection.getAmenitiesCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
  }

  async checkIfAmenitiesExists(amenities_name: string) {
    const country = await this.amenitiesCollection.getAmenitiesByName(amenities_name);
    return country;
  }

  async updateAmenities(userId: string, updateAmenitiesDto: UpdateAmenitiesDto) {
    let data = await this.amenitiesCollection.updateAmenities(userId, updateAmenitiesDto);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getAmenitiesById(id: string) {
    const amenities = await this.amenitiesCollection.getAmenitiesById(id);
    const response = await this.helper.buildResponse(true, null, amenities);
    return response;
  }

  async updateStatus(AmenitiesID: string, status: number) {
    console.log(AmenitiesID)
    let data = await this.amenitiesCollection.updateStatus(AmenitiesID, status);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async softDeleteAmenities(amenitiesId: string) {
    console.log(amenitiesId)
    let data = await this.amenitiesCollection.softDeleteAmenities(amenitiesId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }
  async hardDeleteAmenities(amenitiesId: string) {
    let data = await this.amenitiesCollection.hardDeleteAmenities(amenitiesId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async sortedAmenitiess(order: string): Promise<Amenities[]> {
    return await this.amenitiesCollection.sortedAmenitiess(order);
  }
}

