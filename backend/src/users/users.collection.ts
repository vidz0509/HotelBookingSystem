import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { User } from './users.schema';

@Injectable()
export class UsersCollection {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async createUser(fullname: string, email: string, password: string, confirmpassword: string) {
        const newUser = await new this.userModel(
            {
                fullname: fullname,
                email: email,
                password: password,
                confirmpassword: confirmpassword,
                createdAt: new Date(),
                isDeleted: false,
            },
        );
        return newUser.save();
    }

    async getUserByName(name: string): Promise<User> {
        return await this.userModel.findOne({ name: name });
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email });
    }

    async updateUser(userID: string, requestData: { name: string, age: number, hobby: string }) {
        return await this.userModel.findByIdAndUpdate(
            userID,
            {
                name: requestData.name,
                age: requestData.age,
                hobby: requestData.hobby
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