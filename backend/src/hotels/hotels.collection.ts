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
        return await this.hotelModel.aggregate([
            {
                $match: {
                    isDeleted: false
                }
            },
            { $sort: { createdAt: -1 } },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    let: { locationId: { $toObjectId: "$location_id" } }, // Convert location_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$locationId"] }
                            }
                        },
                        {
                            $project: {
                                location_code: 1,
                                location_name: 1
                            }
                        }
                    ],
                    as: 'location_details'
                }
            },
        ]);
    }

    async getHotelCount(): Promise<number> {
        return await this.hotelModel.countDocuments({
            isDeleted: false,
        });
    }

    async sortedHotels(order: string): Promise<Hotels[]> {
        return await this.hotelModel.aggregate([
            { $sort: { hotel_name: order == 'desc' ? -1 : 1 } },
            //   { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }

    async getHotelById(id: string): Promise<Hotels> {
        return this.hotelModel.findById(id);
    }

    async createHotel(createHotelDto: CreateHotelDto) {
        const newHotel = await new this.hotelModel({

            location_id: createHotelDto.location_id,
            country_id: createHotelDto.country_id,
            hotel_code: createHotelDto.hotel_code,
            hotel_name: createHotelDto.hotel_name,
            hotel_address: createHotelDto.hotel_address,
            average_rating: createHotelDto.average_rating,
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
        updateHotelDto['updatedAt'] = new Date();
        return await this.hotelModel.findByIdAndUpdate(
            HotelID,
            updateHotelDto,
            { 
                new: true 
            },
        );
    }

    async updateStatus(HotelID: string, status: number) {
        return this.hotelModel.findByIdAndUpdate(
            HotelID,
            {
                isActive: status === 1 ? true : false,
            },
        );
    }

    async softDeleteHotel(hotelId: string) {
        return this.hotelModel.findByIdAndUpdate(
            hotelId,
            {
                isDeleted: true,
            },
        );
    }

    async hardDeleteHotel(hotelId: string) {
        return this.hotelModel.deleteOne({ _id: hotelId });
    }

}