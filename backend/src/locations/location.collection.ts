import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateLocationDto } from './dto/create.dto';
// import { SignInUserDto } from '../auth/dto/login.dto';
import { location } from './location.schema';
import { UpdateLocationDto } from './dto/update.dto';

@Injectable()
export class LocationCollection {

    constructor(@InjectModel('Country') private countryModel: Model<Location>) { }

    // async getAllUsers(): Promise<Country[]> {
    //     return await this.userModel.find().select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    async createLocation(createLocationDto: CreateLocationDto) {
        const newCountry = await new this.countryModel({
            location_name: createLocationDto.location_name,
            location_image: createLocationDto.location_image,
            
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newCountry.save();
    }

    // async getUserByName(name: string): Promise<Country> {
    //     return await this.userModel.findOne({ name: name }).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    // async getUser(id: string) {
    //     return await this.userModel.findById(id).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    async getLocationByName(location_name: string): Promise<Location> {
        return this.countryModel.findOne({ location_name: location_name });
    }

    async updateLocation(LocationID: string, updateLocationDto: UpdateLocationDto) {
        return await this.countryModel.findByIdAndUpdate(
            LocationID,
            UpdateLocationDto,
            { new: true },
        );
    }

    // async deleteUser(userID: string) {
    //     return this.userModel.deleteOne(
    //         { _id: userID },
    //         { $set: { updatedat: new Date(), isDeleted: true } },
    //     );
    // }

    // async sortedUsers(order: string): Promise<Country[]> {
    //     return await this.userModel.aggregate([
    //         { $sort: { name: order == 'desc' ? -1 : 1 } },
    //     ]);
    // }
}