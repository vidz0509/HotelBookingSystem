import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLocationDto } from './dto/create.dto';
// import { SignInUserDto } from '../auth/dto/login.dto';
import { Country } from 'src/countries/country.schema';
import { Location } from './location.schema';
import { UpdateLocationDto } from './dto/update.dto';

@Injectable()
export class LocationCollection {

    constructor(@InjectModel('Location') private LocationModel: Model<Location>) { }

    async getAllLocations(size?: number): Promise<Location[]> {
        return await this.LocationModel.aggregate([
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

    async getLocationsCount(): Promise<number> {
        return await this.LocationModel.countDocuments({
            isDeleted: false,
        });
    }

    async sortedLocations(order: string): Promise<Location[]> {
        return await this.LocationModel.aggregate([
            { $sort: { location_name: order == 'desc' ? -1 : 1 } },
            // { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }

    async getLocationById(id: string): Promise<Location> {
        return this.LocationModel.findById(id);
    }

    async getLocationByCountry(countryId: string): Promise<Country[]> {
        return this.LocationModel.find({
            country_id: countryId
        });
    }

    async createLocation(createLocationDto: CreateLocationDto) {
        const newLocation = await new this.LocationModel({
            country_id: createLocationDto.country_id,
            location_code: createLocationDto.location_code,
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
        updateLocationDto['updatedAt'] = new Date();
        return await this.LocationModel.findByIdAndUpdate(
            LocationID,
            updateLocationDto,
            {
                new: true
            },
        );
    }

    async updateStatus(LocationID: string, status: number) {
        return this.LocationModel.findByIdAndUpdate(
            LocationID,
            {
                isActive: status === 1 ? true : false,
            },
        );
    }

    async softDeleteLocation(locationId: string) {
        return this.LocationModel.findByIdAndUpdate(
            locationId,
            {
                isDeleted: true,
            },
        );
    }

    async hardDeleteLocation(locationId: string) {
        return this.LocationModel.deleteOne({ _id: locationId });
    }

    async uploadLocationsImg(locationID: string, locationsImage: string) {
        return await this.LocationModel.findByIdAndUpdate(
            locationID,
            {
                location_image: locationsImage,
            },
            {
                new: true
            }
        );
    }
}