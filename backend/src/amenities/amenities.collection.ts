import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAmenitiesDto } from './dto/create.dto';
import { Amenities } from './amenities.schema';
import { UpdateAmenitiesDto } from './dto/update.dto';
import { retry } from 'rxjs';

@Injectable()
export class AmenitiesCollection {

    constructor(@InjectModel('Amenities') private AmenitiesModel: Model<Amenities>) { }

    async getAllAmenities(): Promise<Amenities[]> {
        return await this.AmenitiesModel.find({
            isDeleted: false,
        })
            .sort({
                createdAt: -1
            });
    }

    async getRandomamenities(): Promise<any> {
        return await this.AmenitiesModel.aggregate([
            {
                $match:{
                    isDeleted: false,
                    isActive:true,
                }
            },
            {
                $sample: {size: 5}
            },
            {
                $project : { _id : { $toString: "$_id" } }
            }
        ])
    }
    
    async getAmenitiesCount(): Promise<number> {
        return await this.AmenitiesModel.countDocuments({
            isDeleted: false,
        });
    }

    async getAmenitiesById(id: string): Promise<Amenities> {
        return this.AmenitiesModel.findById(id);
    }

    async createAmenities(createAmenitiesDto: CreateAmenitiesDto) {
        const newAmenities = await new this.AmenitiesModel({
            amenities_name: createAmenitiesDto.amenities_name,
            amenities_icon: createAmenitiesDto.amenities_icon,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newAmenities.save();
    }

    async getAmenitiesByName(amenities_name: string): Promise<Amenities> {
        return this.AmenitiesModel.findOne({ amenities_name: amenities_name });
    }

    async updateAmenities(AmenitiesID: string, updateAmenitiesDto: UpdateAmenitiesDto) {
        updateAmenitiesDto['updatedAt'] = new Date();
        return await this.AmenitiesModel.findByIdAndUpdate(
            AmenitiesID,
            updateAmenitiesDto,
            { 
                new: true 
            },
        );
    }

    async updateStatus(AmenitiesID: string, status: number) {
        return this.AmenitiesModel.findByIdAndUpdate(
            AmenitiesID,
            {
                isActive: status === 1 ? true : false,
            },
        );
    }

    async softDeleteAmenities(amenitiesId: string) {
        return this.AmenitiesModel.findByIdAndUpdate(
            amenitiesId,
            {
                isDeleted: true,
            },
        );
    }
    async hardDeleteAmenities(amenitiesId: string) {
        return this.AmenitiesModel.deleteOne({ _id: amenitiesId });
    }

    async sortedAmenitiess(order: string): Promise<Amenities[]> {
        return await this.AmenitiesModel.aggregate([
            { $sort: { amenities_name: order == 'desc' ? -1 : 1 } },
        ]);
    }
}