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

    async createUser(name: string, age: number, hobby: string) {
        const newUser = await new this.userModel(
            {
                name: name,
                age: age,
                hobby: hobby
            }
        );
        return newUser.save();
    }

    async getUserByName(name: string): Promise<User> {
        return this.userModel.findOne({ name: name });
    }

}