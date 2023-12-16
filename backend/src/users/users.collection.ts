import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../auth/dto/register.dto';
import { SignInUserDto } from '../auth/dto/login.dto';
import { User } from './users.schema';
import { UpdateUserDto } from 'src/auth/dto/update.dto';

@Injectable()
export class UsersCollection {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async signIn(email: string, password: string) {
        const newUser = await new this.userModel(
            {
                email: email,
                password: password,
                createdAt: new Date(),
                isDeleted: false,
            },
        );
        return newUser.save();
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = await new this.userModel({
            fullname: createUserDto.fullname,
            email: createUserDto.email,
            password: createUserDto.password,
            phone: createUserDto.phone,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newUser.save();
    }

    async getUserByName(name: string): Promise<User> {
        return await this.userModel.findOne({ name: name });
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email });
    }

    // async getUserByPassword(password: string): Promise<User> {
    //     return await this.userModel.findOne({ password: password });
    // }

    async updateUser(userID: string, createUserDto: CreateUserDto) {
        return await this.userModel.findByIdAndUpdate(
            userID,
            UpdateUserDto,
            {
                fullname: createUserDto.fullname,
                email: createUserDto.email,
                password: createUserDto.password,
                phone: createUserDto.phone,
            },
            { new: true },
        );
    }

    async deleteUser(userID: string) {
        return this.userModel.deleteOne(
            { _id: userID },
            { $set: { updatedat: new Date(), isDeleted: true } },
        );
    }

    async sortedUsers(order: string): Promise<User[]> {
        return await this.userModel.aggregate([
            { $sort: { name: order == 'desc' ? -1 : 1 } },
        ]);
    }
}