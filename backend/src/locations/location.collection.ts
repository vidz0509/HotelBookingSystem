import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateLocationDto } from './dto/create.dto';
// import { SignInUserDto } from '../auth/dto/login.dto';
import { Location } from './location.schema';
import { UpdateLocationDto } from './dto/update.dto';

@Injectable()
export class LocationCollection {

    constructor(@InjectModel('Location') private LocationModel: Model<Location>) { }

    async getAllLocations(): Promise<Location[]> {
        return await this.LocationModel.find();
    }

    async createLocation(createLocationDto: CreateLocationDto) {
        const newLocation = await new this.LocationModel({
            country_id: createLocationDto.country_id,
            location_name: createLocationDto.location_name,
            location_image: createLocationDto.location_image,

            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newLocation.save();
    }

    // async getUserByName(name: string): Promise<Country> {
    //     return await this.userModel.findOne({ name: name }).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    // async getUser(id: string) {
    //     return await this.userModel.findById(id).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    async getLocationByName(location_name: string): Promise<Location> {
        return this.LocationModel.findOne({ location_name: location_name });
    }

    async updateLocation(LocationID: string, updateLocationDto: UpdateLocationDto) {
        return await this.LocationModel.findByIdAndUpdate(
            LocationID,
            updateLocationDto,
            { new: true },
        );
    }

    async deleteLocation(locationId: string) {
        return this.LocationModel.deleteOne({ _id: locationId });
    }

    async sortedLocations(order: string): Promise<Location[]> {
        return await this.LocationModel.aggregate([
            { $sort: { location_name: order == 'desc' ? -1 : 1 } },
            // { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }
}