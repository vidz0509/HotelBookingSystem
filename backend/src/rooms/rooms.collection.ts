import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create.dto';
import { Rooms } from './rooms.schema';
import { UpdateRoomDto } from './dto/update.dto';
import { Hotels } from 'src/hotels/hotels.schema';

@Injectable()
export class RoomsCollection {

    constructor(@InjectModel('Rooms') private roomModel: Model<Rooms>) { }

    async getAllRoom(): Promise<Rooms[]> {
        return await this.roomModel.aggregate([
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
                    from: 'hotels',
                    let: { hotelId: { $toObjectId: "$hotel_id" } }, // Convert hotel_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$hotelId"] }
                            }
                        },
                        {
                            $project: {
                                hotel_code: 1,
                                hotel_name: 1
                            }
                        }
                    ],
                    as: 'hotel_details'
                }
            },
            {
                $lookup: {
                    from: 'roomtypes',
                    let: { roomTypesId: { $toObjectId: "$room_type_id" } }, // Convert roomType_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$roomTypesId"] }
                            }
                        },
                        {
                            $project: {
                                roomtype_name: 1
                            }
                        }
                    ],
                    as: 'roomTypes_details'
                }
            },
        ]);
    }

    async getRoomCount(): Promise<number> {
        return await this.roomModel.countDocuments({
            isDeleted: false,
        });
    }

    async sortedRooms(order: string): Promise<Rooms[]> {
        return await this.roomModel.aggregate([
            { $sort: { room_name: order == 'desc' ? -1 : 1 } },
            //   { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }

    async getRoomByHotelId(hotel_id: string): Promise<any[]> {
        return this.roomModel.aggregate([
            {
                $match: {
                    hotel_id : hotel_id,
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
                    from: 'hotels',
                    let: { hotelId: { $toObjectId: "$hotel_id" } }, // Convert hotel_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$hotelId"] }
                            }
                        },
                        {
                            $project: {
                                hotel_code: 1,
                                hotel_name: 1
                            }
                        }
                    ],
                    as: 'hotel_details'
                }
            },
            {
                $lookup: {
                    from: 'roomtypes',
                    let: { roomTypesId: { $toObjectId: "$room_type_id" } }, // Convert roomType_id string to ObjectId
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$roomTypesId"] }
                            }
                        },
                        {
                            $project: {
                                roomtype_name: 1,
                                max_adults: 1,
                                max_children: 1
                            }
                        }
                    ],
                    as: 'roomTypes_details'
                }
            },
        ]);
    }

    async getRoomPriceByHotelId(hotel_id: string): Promise<any[]> {
        return this.roomModel.aggregate([
            {
                $match: {
                    hotel_id : hotel_id,
                    isDeleted: false
                }
            },
            {
                 $project: {
                 price: 1,
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
        ]);
    }

    async getRoomById(id: string): Promise<Rooms> {
        return this.roomModel.findById(id);
    }

    async createRoom(createRoomDto: CreateRoomDto) {
        const newRoom = await new this.roomModel({

            hotel_id: createRoomDto.hotel_id,
            room_type_id: createRoomDto.room_type_id,
            room_image: createRoomDto.room_image,
            price: createRoomDto.price,
            total_rooms: createRoomDto.total_rooms,

            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newRoom.save();
    }

    async getRoomByName(room_name: string): Promise<Rooms> {
        return this.roomModel.findOne({ room_name: room_name });
    }

    async updateRoom(RoomID: string, updateRoomDto: UpdateRoomDto) {
        updateRoomDto['updatedAt'] = new Date();
        return await this.roomModel.findByIdAndUpdate(
            RoomID,
            updateRoomDto,
            {
                new: true
            },
        );
    }

    async updateStatus(RoomID: string, status: number) {
        return this.roomModel.findByIdAndUpdate(
            RoomID,
            {
                isActive: status === 1 ? true : false,
            },
        );
    }

    async softDeleteRoom(roomId: string) {
        return this.roomModel.findByIdAndUpdate(
            roomId,
            {
                isDeleted: true,
            },
        );
    }

    async hardDeleteRoom(roomId: string) {
        return this.roomModel.deleteOne({ _id: roomId });
    }

    async uploadRoomsImg(roomId: string, roomImage: string) {
        return await this.roomModel.findByIdAndUpdate(
            roomId,
            {
                room_image: roomImage,
            },
            {
                new: true
            }
        );
    }

    async getRoomTypesByHotelId(hotel_id: string): Promise<Rooms[]> {
        return this.roomModel.aggregate([
            {
                $match: {
                    hotel_id : hotel_id,
                    isDeleted: false
                }
            }
        ]);
    }

}