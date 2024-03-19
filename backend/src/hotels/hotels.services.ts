import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { HotelsCollection } from './hotels.collection';
import { Hotels } from './hotels.schema';

import { CreateHotelDto } from './dto/create.dto';
import { UpdateHotelDto } from './dto/update.dto';
import { SearchHotelDto } from './dto/search.dto';
import { BookingCollection } from 'src/bookings/booking.collection';
import { BookingService } from 'src/bookings/booking.services';
import { RoomsCollection } from 'src/rooms/rooms.collection';
import { AmenitiesCollection } from 'src/amenities/amenities.collection';

@Injectable()
export class HotelsService {
  private readonly logger = new Logger(HotelsService.name);
  constructor(
    private readonly hotelCollection: HotelsCollection,
    private readonly bookingServices: BookingService,
    private readonly bookingCollection: BookingCollection,
    private readonly amenitiesCollection : AmenitiesCollection,
    private readonly roomsCollection: RoomsCollection,
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

  async getAllHotel(size?: number): Promise<any> {
    let data = await this.hotelCollection.getAllHotel(size);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getHotelCount(): Promise<any> {
    let count = await this.hotelCollection.getHotelCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
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

  async updateStatus(HotelID: string, status: number) {
    console.log(HotelID)
    let data = await this.hotelCollection.updateStatus(HotelID, status);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async sortedHotels(order: string): Promise<Hotels[]> {
    return await this.hotelCollection.sortedHotels(order);
  }

  async getHotelById(id: string) {
    const hotel = await this.hotelCollection.getHotelById(id);
    const response = await this.helper.buildResponse(true, null, hotel[0]);
    return response;
  }

  async softDeleteHotel(hotelId: string) {
    console.log(hotelId)
    let data = await this.hotelCollection.softDeleteHotel(hotelId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async hardDeleteHotel(hotelId: string) {
    let data = await this.hotelCollection.hardDeleteHotel(hotelId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async uploadHotelsImg(hotelId: string, files: Array<Express.Multer.File>) {
    let imageArray = [];
    files.forEach((ele) => {
      if (ele.filename) {
        imageArray.push(`${process.env.APP_URL}/hotels/uploads/hotelsImg/${ele.filename}`);
      }
    })
    // const hotelImage = `${process.env.APP_URL}/hotels/uploads/hotelsImg/${file.filename}`;
    let data = await this.hotelCollection.uploadHotelsImg(hotelId, imageArray);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
    // return { message: 'File uploaed successfully', url: frontendUrl };
  }

  async searchHotels(searchHotelDto: SearchHotelDto) {
    const searchHotels = await this.hotelCollection.searchHotels(searchHotelDto);
    let allHotels = [];
    const promises = searchHotels.map(async(hotel,index) => {
      let hotel_id = hotel._id.toString();
      const roomsdata = await this.roomsCollection.getRoomPriceByHotelId(hotel_id);
      const smallestRoomPrice = roomsdata.reduce((minPrice, room) => {
        return room.price < minPrice ? room.price : minPrice;
      }, Infinity);
      hotel['room_price'] = smallestRoomPrice;
      allHotels[index] = hotel;
      return allHotels;
    });
    await Promise.all(promises).then((result) =>{
      return result;
    });
    const response = await this.helper.buildResponse(true, null, allHotels);
    return response;
  }


  async updateRoomTypesForHotel(hotelId){
    const roomTypeData = await this.roomsCollection.getRoomTypesByHotelId(hotelId);
    let arr = [];
    roomTypeData.map((data)=>{
      arr.push(data?.room_type_id);
    });
    if(arr.length > 0){
      await this.hotelCollection.updateRoomTypesByHotelID(hotelId,arr);
    }
  }

  async getAllHotelIDs(){
    const allHotels = await this.hotelCollection.getAllHotels();
    allHotels.map((hotel)=>{
      this.updateRoomTypesForHotel((hotel._id).toString());
    });
  }

  async updateHotelAmenities(){
    const allHotels = await this.hotelCollection.getAllHotels();
    allHotels.map(async (hotel)=>{
      const randomAmenities = await this.amenitiesCollection.getRandomamenities();
      let amenitiesArr = [];
      randomAmenities.map((amenity) =>{
        amenitiesArr.push(amenity._id);
      })
      this.hotelCollection.updateAmenitiesForHotel((hotel._id).toString(),amenitiesArr);
    });
  }

}
