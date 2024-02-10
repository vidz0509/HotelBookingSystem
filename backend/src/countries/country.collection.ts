import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateCountryDto } from './dto/create.dto';
// import { SignInUserDto } from '../auth/dto/login.dto';
import { Country } from './country.schema';
import { UpdateCountryDto } from './dto/update.dto';
import { count } from 'console';

@Injectable()
export class CountryCollection {

    constructor(@InjectModel('Country') private countryModel: Model<Country>) { }

    async getAllCountry(): Promise<Country[]> {
        return await this.countryModel.find({
            isDeleted: false,
        })
            .sort({
                createdAt: -1
            });
    }

    async getCountryCount(): Promise<number> {
        return await this.countryModel.countDocuments({
            isDeleted: false,
        });
    }

    async sortedCountries(order: string): Promise<Country[]> {
        return await this.countryModel.aggregate([
            { $sort: { country_name: order == 'desc' ? -1 : 1 } },
            //   { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }

    async getCountryById(id: string): Promise<Country> {
        return this.countryModel.findById(id);
    }

    async createCountry(createCountryDto: CreateCountryDto) {
        const newCountry = await new this.countryModel({
            country_code: createCountryDto.country_code,
            country_name: createCountryDto.country_name,
            country_image: createCountryDto.country_image,

            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newCountry.save();
    }

    async getCountryByCode(country_code: string): Promise<Country> {
        return this.countryModel.findOne({ country_code: country_code });
    }
    // async getUser(id: string) {
    //     return await this.userModel.findById(id).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    // }

    async getCountryByName(country_name: string): Promise<Country> {
        return this.countryModel.findOne({ country_name: country_name });
    }

    async updateCountry(CountryID: string, updateCountryDto: UpdateCountryDto) {
        updateCountryDto['updatedAt'] = new Date();
        return await this.countryModel.findByIdAndUpdate(
            CountryID,
            updateCountryDto,
            {
                new: true,
            },
        );
    }

    async updateStatus(countryId: string, status: number) {
        return this.countryModel.findByIdAndUpdate(
            countryId,
            {
                isActive: status === 1 ? true : false,
            },
        );
    }

    async softDeleteCountry(countryId: string) {
        return this.countryModel.findByIdAndUpdate(
            countryId,
            {
                isDeleted: true,
            },
        );
    }

    async hardDeleteCountry(countryId: string) {
        return this.countryModel.deleteOne({ _id: countryId });
    }

    async uploadCountriesImg(countryId: string, countriesImage: string) {
        return await this.countryModel.findByIdAndUpdate(
            countryId,
            {
                country_image: countriesImage,
            },
            {
                new: true
            }
        );
    }

}