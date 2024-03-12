import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { RoomsCollection } from './rooms.collection';
import { Rooms } from './rooms.schema';

import { HotelsService } from 'src/hotels/hotels.services';
import { HotelsCollection } from 'src/hotels/hotels.collection';

import { CreateRoomDto } from './dto/create.dto';
import { UpdateRoomDto } from './dto/update.dto';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  constructor(
    private readonly roomCollection: RoomsCollection,
    private readonly hotelsCollection: HotelsCollection,
    private readonly helper: HelpersServices,
  ) { }

  async createRoom(createRoomDto: CreateRoomDto) {
    try {
      const newRoom = await this.roomCollection.createRoom(createRoomDto);
      await this.hotelsCollection.updateRoomType(newRoom.hotel_id, newRoom.room_type_id);
      const response = await this.helper.buildResponse(true, null, newRoom);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async getAllRoom(): Promise<any> {
    let data = await this.roomCollection.getAllRoom();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getRoomCount(): Promise<any> {
    let count = await this.roomCollection.getRoomCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
  }

  async checkIfRoomExists(room_name: string) {
    const room = await this.roomCollection.getRoomByName(room_name);
    return room;
  }

  async updateRoom(userId: string, updateRoomDto: UpdateRoomDto) {
    let data = await this.roomCollection.updateRoom(userId, updateRoomDto);
    await this.hotelsCollection.updateRoomTypesByHotelID(data.hotel_id, data.room_type_id);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async updateStatus(RoomID: string, status: number) {
    console.log(RoomID)
    let data = await this.roomCollection.updateStatus(RoomID, status);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async sortedRooms(order: string): Promise<Rooms[]> {
    return await this.roomCollection.sortedRooms(order);
  }

  async getRoomByHotelId(hotel_id: string) {
    const room = await this.roomCollection.getRoomByHotelId(hotel_id);
    const response = await this.helper.buildResponse(true, null, room);
    return response;
  }

  async getRoomById(id: string) {
    const room = await this.roomCollection.getRoomById(id);
    const response = await this.helper.buildResponse(true, null, room);
    return response;
  }

  async softDeleteRoom(roomId: string) {
    console.log(roomId)
    let data = await this.roomCollection.softDeleteRoom(roomId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async hardDeleteRoom(roomId: string) {
    let data = await this.roomCollection.hardDeleteRoom(roomId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async uploadRoomsImg(roomId: string, file: Express.Multer.File) {
    const roomImage = `${process.env.APP_URL}/rooms/uploads/roomsImg/${file.filename}`;
    let data = await this.roomCollection.uploadRoomsImg(roomId, roomImage);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
    // return { message: 'File uploaed successfully', url: frontendUrl };
  }

}
