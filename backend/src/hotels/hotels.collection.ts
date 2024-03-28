import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from './dto/create.dto';
import { Hotels } from './hotels.schema';
import { UpdateHotelDto } from './dto/update.dto';
import { SearchHotelDto } from './dto/search.dto';

@Injectable()
export class HotelsCollection {

    constructor(@InjectModel('Hotels') private hotelModel: Model<Hotels>) { }

    async getAllHotel(size?: number): Promise<Hotels[]> {
        return await this.hotelModel.aggregate([
            {
                $match: {
                    isDeleted: false
                }
            },
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
            {
                $lookup: {
                    from: 'countries',
                    let: { countryId: { $toObjectId: "$country_id" } }, // Convert country_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$countryId"] }
                            }
                        },
                        {
                            $project: {
                                country_code: 1,
                                country_name: 1
                            }
                        }
                    ],
                    as: 'country_details'
                }
            },
        ]).limit(size && size > 0 ? size : 1000);
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

    async getHotelById(id: string): Promise<any> {
        const hotelId = new mongoose.Types.ObjectId(id);
        return await this.hotelModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    _id:hotelId,
                    isActive:true
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
            {
                $lookup: {
                    from: 'countries',
                    let: { countryId: { $toObjectId: "$country_id" } }, // Convert country_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$countryId"] }
                            }
                        },
                        {
                            $project: {
                                country_code: 1,
                                country_name: 1
                            }
                        }
                    ],
                    as: 'country_details'
                }
            },
            {
                $lookup: {
                    from: 'amenities',
                    let: { amenities: "$amenities" }, 
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", { $map: { input: "$$amenities", as: "amenity", in: { $toObjectId: "$$amenity" } } }] }
                            }
                        },
                        {
                            $project: {
                                amenities_name: 1,
                                amenities_icon: 1
                            }
                        }
                    ],
                    as: 'amenities'
                }
            },
        ]);
        // return this.hotelModel.findById(id);
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
            total_rooms: createHotelDto.total_rooms,

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

    async uploadHotelsImg(hotelId: string, imageArray: string[]) {
        return await this.hotelModel.findByIdAndUpdate(
            hotelId,
            {
                hotel_image: imageArray,
            },
            {
                new: true
            }
        );
    }

    async searchHotels(searchHotelDto: SearchHotelDto): Promise<any[]> {
        let searchArr: any = {
            isDeleted: false,
            isActive: true,
        };
        if (searchHotelDto.country_id)
            searchArr.country_id = searchHotelDto.country_id;
        if (searchHotelDto.location_id)
            searchArr.location_id = searchHotelDto.location_id;
        if (searchHotelDto.roomTypes?.length > 0)
            searchArr.roomTypes = { $in: searchHotelDto.roomTypes };
        if (searchHotelDto.amenities?.length > 0)
            searchArr.amenities = { $in: searchHotelDto.amenities };
        return await this.hotelModel.aggregate([
            {
                $match: searchArr
            },
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
            {
                $lookup: {
                    from: 'countries',
                    let: { countryId: { $toObjectId: "$country_id" } }, // Convert country_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$countryId"] }
                            }
                        },
                        {
                            $project: {
                                country_code: 1,
                                country_name: 1
                            }
                        }
                    ],
                    as: 'country_details'
                }
            },
        ]);

    }

    async getAllHotels(): Promise<any> {
        return this.hotelModel.find({
            isDeleted : false
        }).select("_id");
    }

    async updateRoomTypesByHotelID(hotelId,roomTypes){
        console.log(hotelId);
        return await this.hotelModel.findByIdAndUpdate(
            hotelId,
            { $push: { roomTypes: roomTypes } },
            {
                new : true
            }
        );
    }

    async updateAmenitiesForHotel(hotelId,amenities){
        return await this.hotelModel.findByIdAndUpdate(
            hotelId,
            { $set: { amenities: amenities } },
            {
                new : true
            }
        );
    }

    async updateRoomType(hotelId,roomTypes){
        console.log(hotelId);
        return await this.hotelModel.findByIdAndUpdate(
            hotelId,
            { $addToSet: { roomTypes: roomTypes } },
        );
    }
}