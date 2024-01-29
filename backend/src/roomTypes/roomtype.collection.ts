import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomTypeDto } from './dto/create.dto';
// import { SignInUserDto } from '../auth/dto/login.dto';
import { RoomType } from './roomtype.schema';
import { UpdateRoomTypeDto } from './dto/update.dto';

@Injectable()
export class RoomTypeCollection {

    constructor(@InjectModel('RoomType') private RoomTypeModel: Model<RoomType>) { }

    async getAllRoomTypes(): Promise<RoomType[]> {
        return await this.RoomTypeModel.find({
            isDeleted: false,
        })
            .sort({
                createdAt: -1
            });
    }

    async getRoomTypeById(id: string): Promise<RoomType> {
        return this.RoomTypeModel.findById(id);
    }

    async createRoomType(createRoomTypeDto: CreateRoomTypeDto) {
        const newRoomType = await new this.RoomTypeModel({
            roomtype_name: createRoomTypeDto.roomtype_name,

            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newRoomType.save();
    }

    // async getUserByName(name: string): Promise<Country> {
    //     return await this.userModel.findOne({ name: name }).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    // async getUser(id: string) {
    //     return await this.userModel.findById(id).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    async getRoomTypeByName(roomtype_name: string): Promise<RoomType> {
        return this.RoomTypeModel.findOne({ roomtype_name: roomtype_name });
    }

    async updateRoomType(RoomTypeID: string, updateRoomTypeDto: UpdateRoomTypeDto) {
        return await this.RoomTypeModel.findByIdAndUpdate(
            RoomTypeID,
            updateRoomTypeDto,
            { new: true },
        );
    }

    async softDeleteRoomType(roomtypeId: string) {
        return this.RoomTypeModel.findByIdAndUpdate(
            roomtypeId,
            {
                isDeleted: true,
            },
        );
    }
    async hardDeleteRoomType(roomtypeId: string) {
        return this.RoomTypeModel.deleteOne({ _id: roomtypeId });
    }

    async sortedRoomTypes(order: string): Promise<RoomType[]> {
        return await this.RoomTypeModel.aggregate([
            { $sort: { roomtype_name: order == 'desc' ? -1 : 1 } },
            // { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }
}