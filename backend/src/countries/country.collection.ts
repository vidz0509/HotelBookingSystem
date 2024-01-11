import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateCountryDto } from './dto/create.dto'; 
// import { SignInUserDto } from '../auth/dto/login.dto';
import { Country } from './country.schema'; 
import { UpdateCountryDto } from './dto/update.dto'; 

@Injectable()
export class CountryCollection {

    constructor(@InjectModel('Country') private countryModel: Model<Country>) { }

    // async getAllUsers(): Promise<Country[]> {
    //     return await this.userModel.find().select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    async createCountry(createCountryDto: CreateCountryDto) {
        const newCountry = await new this.countryModel({
            country_name: createCountryDto.country_name,
            country_image: createCountryDto.country_image,
            
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

    async getCountryByName(country_name: string): Promise<Country> {
        return this.countryModel.findOne({ country_name: country_name });
    }

    async updateCountry(CountryID: string, updateCountryDto: UpdateCountryDto) {
        return await this.countryModel.findByIdAndUpdate(
            CountryID,
            updateCountryDto,
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