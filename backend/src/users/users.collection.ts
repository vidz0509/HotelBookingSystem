import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { User } from './users.schema';

@Injectable()
export class UsersCollection {

    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async createUser(name: string, age: number, hobby: string) {
        const newUser = await new this.userModel(
            {
                name : name,
                age : age,
                hobby : hobby
            }
        );
        return newUser.save();
    }
}