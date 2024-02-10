import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { RoomTypeCollection } from './roomtype.collection';
import { RoomType } from './roomtype.schema';

import { CreateRoomTypeDto } from './dto/create.dto';
import { UpdateRoomTypeDto } from './dto/update.dto';

@Injectable()
export class RoomTypeService {
  private readonly logger = new Logger(RoomTypeService.name);
  constructor(
    private readonly roomtypeCollection: RoomTypeCollection,
    private readonly helper: HelpersServices,
  ) { }


  async getAllRoomTypes(): Promise<any> {
    let data = await this.roomtypeCollection.getAllRoomTypes();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getRoomTypesCount(): Promise<any> {
    let count = await this.roomtypeCollection.getRoomTypesCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
  }

  async createRoomType(createRoomTypeDto: CreateRoomTypeDto) {
    const isRoomTypeExists = await this.checkIfRoomTypeExists(createRoomTypeDto.roomtype_name);
    if (isRoomTypeExists) {
      throw new ConflictException(
        await this.helper.buildResponse(false, `RoomType is already Exists.`),
      );
    }
    try {
      await this.roomtypeCollection.createRoomType(createRoomTypeDto);
      const newRoomType = await this.roomtypeCollection.getRoomTypeByName(createRoomTypeDto.roomtype_name);
      const response = await this.helper.buildResponse(true, null, newRoomType);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async checkIfRoomTypeExists(roomtype_name: string) {
    const country = await this.roomtypeCollection.getRoomTypeByName(roomtype_name);
    return country;
  }

  async updateRoomType(userId: string, updateRoomTypeDto: UpdateRoomTypeDto) {
    let data = await this.roomtypeCollection.updateRoomType(userId, updateRoomTypeDto);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async sortedRoomTypes(order: string): Promise<RoomType[]> {
    return await this.roomtypeCollection.sortedRoomTypes(order);
  }

  async getRoomTypeById(id: string) {
    const roomtype = await this.roomtypeCollection.getRoomTypeById(id);
    const response = await this.helper.buildResponse(true, null, roomtype);
    return response;
  }

  async updateStatus(RoomTypeID: string, status: number) {
    console.log(RoomTypeID)
    let data = await this.roomtypeCollection.updateStatus(RoomTypeID, status);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async softDeleteRoomType(roomtypeId: string) {
    console.log(roomtypeId)
    let data = await this.roomtypeCollection.softDeleteRoomType(roomtypeId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }
  async hardDeleteRoomType(roomtypeId: string) {
    let data = await this.roomtypeCollection.hardDeleteRoomType(roomtypeId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }
}

