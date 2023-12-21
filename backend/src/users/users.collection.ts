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
        return await this.userModel.find().select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    }

    async getUserWithPassword(id: string) {
        return await this.userModel.findById(id);
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

    // async getUserByName(name: string): Promise<User> {
    //     return await this.userModel.findOne({ name: name });
    // }

    async getUser(id: string) {
        return await this.userModel.findById(id).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    }

    async getUserByEmail(email: string): Promise<any> {
        return await this.userModel.find({ email: email }).select('_id fullname email phone createdAt updatedAt isDeleted isActive');
    }

    // async getUserByPassword(password: string): Promise<User> {
    //     return await this.userModel.findOne({ password: password });
    // }

    async updateUser(userID: string, updateUserDto: UpdateUserDto) {
        return await this.userModel.findByIdAndUpdate(
            userID,
            updateUserDto,
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

    async changePassword(userId: string, password: string) {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                password: password,
            },
            {
                new: true
            }
        );
    }
}