import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { HotelsCollection } from './hotels.collection';
import { Hotels } from './hotels.schema';

import { CreateHotelDto } from './dto/create.dto';
import { UpdateHotelDto } from './dto/update.dto';

@Injectable()
export class HotelsService {
  private readonly logger = new Logger(HotelsService.name);
  constructor(
    private readonly hotelCollection: HotelsCollection,
    private readonly helper: HelpersServices,
  ) { }

  async createHotel(createHotelDto: CreateHotelDto) {
    const isHotelExists = await this.checkIfHotelExists(createHotelDto.hotel_name);
    if (isHotelExists) {
      throw new ConflictException(
        await this.helper.buildResponse(false, `Hotel is already Exists.`),
      );
    }
    try {
      await this.hotelCollection.createHotel(createHotelDto);
      const newHotel = await this.hotelCollection.getHotelByName(createHotelDto.hotel_name);
      const response = await this.helper.buildResponse(true, null, newHotel);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async checkIfHotelExists(hotel_name: string) {
    const hotel = await this.hotelCollection.getHotelByName(hotel_name);
    return hotel;
  }

  async updateHotel(userId: string, updateHotelDto: UpdateHotelDto) {
    let data = await this.hotelCollection.updateHotel(userId, updateHotelDto);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getHotelById(id: string) {
    const hotel = await this.hotelCollection.getHotelById(id);
    const response = await this.helper.buildResponse(true, null, hotel);
    return response;
  }

  async getAllHotel(): Promise<any> {
    let data = await this.hotelCollection.getAllHotel();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async softDeleteHotel(hotelId: string) {
    console.log(hotelId)
    let data = await this.hotelCollection.softDeleteHotel(hotelId);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async hardDeleteHotel(hotelId: string) {
    let data = await this.hotelCollection.hardDeleteHotel(hotelId);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async sortedHotels(order: string): Promise<Hotels[]> {
    return await this.hotelCollection.sortedHotels(order);
  }
}
