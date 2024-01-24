import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from './dto/create.dto'; 
import { Hotels } from './hotels.schema';
import { UpdateHotelDto } from './dto/update.dto';

@Injectable()
export class HotelsCollection {

    constructor(@InjectModel('Hotels') private hotelModel: Model<Hotels>) { }

    async getAllHotel(): Promise<Hotels[]> {
        return await this.hotelModel.find();
    }

    async getHotelById(id: string): Promise<Hotels> {
        return this.hotelModel.findById(id);
    }

    async createHotel(createHotelDto: CreateHotelDto) {
        const newHotel = await new this.hotelModel({
            
            location_id:createHotelDto.location_id,
            country_id:createHotelDto.country_id,
            hotel_code: createHotelDto.hotel_code,
            hotel_name: createHotelDto.hotel_name,
            hotel_address: createHotelDto.hotel_address,
            average_rating:createHotelDto.average_rating,
            hotel_image: createHotelDto.hotel_image,

            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newHotel.save();
    }

    async getHotelByName(hotel_name: string): Promise<Hotels> {
        return this.hotelModel.findOne({ hotel_name: hotel_name });
    }

    async updateHotel(HotelID: string, updateHotelDto: UpdateHotelDto) {
        return await this.hotelModel.findByIdAndUpdate(
            HotelID,
            updateHotelDto,
            { new: true },
        );
    }

    async deleteHotel(HotelId: string) {
        return this.hotelModel.deleteOne({ _id: HotelId });
    }

    async sortedHotels(order: string): Promise<Hotels[]> {
        return await this.hotelModel.aggregate([
            { $sort: { hotel_name: order == 'desc' ? -1 : 1 } },
            //   { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }
}