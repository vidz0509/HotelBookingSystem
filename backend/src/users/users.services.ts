import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { User, UsersDocument, UserSchema } from './users.schema';
import { UsersCollection } from './users.collection';
import { HelpersServices } from 'src/auth/services/helpers/helpers.services';
import { UpdateUserDto } from 'src/auth/dto/update.dto';


@Injectable()
export class UsersService {

    constructor(
        private readonly collection: UsersCollection,
        private readonly helper: HelpersServices,
    ) { }

    async getAllUsers(): Promise<any> {
        let data = await this.collection.getAllUsers();
        const response = await this.helper.buildResponse(true, null, data);
        return response;
    }

    async register(createUserDto) {
        return await this.collection.createUser(createUserDto);
    }

    // async getUserByName(name: string): Promise<User> {
    //     return await this.collection.getUserByName(name);
    // }

    async getUser(Id: string) {
        let data = await this.collection.getUser(Id);
        const response = await this.helper.buildResponse(true, null, data);
        return response;
    }

    async getUserByEmail(email: string): Promise<any> {
        let user = await this.collection.getUserByEmail(email);
        return await this.helper.buildResponse(true, null, user);
    }

    // async getUserByPassword(password: string): Promise<User> {
    //     return await this.collection.getUserByPassword(password);
    // }

    async updateUser(userID: string, updateUserDto: UpdateUserDto) {
        return await this.collection.updateUser(userID, updateUserDto);
    }

    async deleteUser(userID: string) {
        return await this.collection.deleteUser(userID);
    }

    async sortedUsers(order: string): Promise<User[]> {
        return await this.collection.sortedUsers(order);
    }

}