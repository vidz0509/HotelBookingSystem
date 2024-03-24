import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../auth/dto/register.dto';
// import { SignInUserDto } from '../auth/dto/login.dto';
import { User } from './users.schema';
import { UpdateUserDto } from 'src/auth/dto/update.dto';

@Injectable()
export class UsersCollection {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find({ isDeleted: false, userType : 2 }).select('_id fullname email phone profileImg createdAt updatedAt isDeleted isActive userType');
    }

    async getUsersCount(): Promise<number> {
        return await this.userModel.countDocuments({
            isDeleted: false,
            userType: 2,
        });
    }

    async getUserWithPassword(email: string) {
        return await this.userModel.findOne({ email: email });
    }

    async updateStatus(userId: string, status: number) {
        return this.userModel.findByIdAndUpdate(
            userId,
            {
                isActive: status === 1 ? true : false,
            },
        );
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
            userType: 2
        });
        return newUser.save();
    }

    async getUserByName(name: string): Promise<User> {
        return await this.userModel.findOne({ name: name }).select('_id fullname email phone profileImg createdAt updatedAt isDeleted isActive userType');
    }

    async getUser(id: string) {
        return await this.userModel.findById(id).select('_id fullname email phone profileImg revio_client_id createdAt updatedAt isDeleted isActive userType');
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email: email }).select('_id fullname email phone profileImg createdAt updatedAt isDeleted isActive userType');
    }

    async getUserByPassword(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email })
    }

    async updateUser(userID: string, updateUserDto: UpdateUserDto) {
        return await this.userModel.findByIdAndUpdate(
            userID,
            updateUserDto,
            { new: true },
        );
    }

    async updateClient(revio_client_id: string, userID: string) {
        return await this.userModel.findByIdAndUpdate(
            userID,
            {
                revio_client_id : revio_client_id
            },
            { new: true },
        )
    }

    async deleteUser(userID: string) {
        return this.userModel.deleteOne(
            { _id: userID },
            { $set: { updatedat: new Date(), isDeleted: true } },
        );
    }

    async sortedUsers(order: string): Promise<User[]> {
        return await this.userModel.aggregate([
            { $sort: { fullname: order == 'desc' ? -1 : 1 } },
            //   { $set: { createAt: new Date(), isDeleted: true } },
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

    async uploadProfile(userId: string, profileImage: string) {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                profileImg: profileImage,
            },
            {
                new: true
            }
        );
    }

}