import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { User, UsersDocument, UserSchema } from './users.schema';
import { UsersCollection } from './users.collection';
import { HelpersServices } from 'src/services/helpers/helpers.services';
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

    async getUsersCount(): Promise<any> {
        let count = await this.collection.getUsersCount();
        const response = await this.helper.countResponse(true, null, count);
        return response;
    }

    async register(createUserDto) {
        return await this.collection.createUser(createUserDto);
    }

    async getUser(Id: string) {
        let data = await this.collection.getUser(Id);
        const response = await this.helper.buildResponse(true, null, data);
        return response;
    }

    // async getUserByEmail(email: string): Promise<any> {
    //     // let user = await this.collection.getUserByEmail(email);
    //     return await this.helper.buildResponse(true, null, user);
    // }

    async getUserByEmail(email: string): Promise<User> {
        // let user = await this.collection.getUserByEmail(email);
        return await this.collection.getUserByEmail(email);
    }

    async getUserByPassword(password: string): Promise<User> {
        return await this.collection.getUserByPassword(password);
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        await this.collection.updateUser(userId, updateUserDto);
        let data = await this.collection.getUser(userId);
        const response = await this.helper.buildResponse(true, null, data);
        return response;
    }

    async deleteUser(userID: string) {
        return await this.collection.deleteUser(userID);
    }

    async sortedUsers(order: string): Promise<User[]> {
        return await this.collection.sortedUsers(order);
    }

    async updateStatus(userId: string, status: number) {
        let data = await this.collection.updateStatus(userId, status);
        const response = await this.helper.buildResponse(true, null, data);
        return response;
      }

    async uploadProfile(id: string,file: Express.Multer.File) {
        const profileImage = `${process.env.APP_URL}/users/uploads/userProfiles/${file.filename}`;
        let data = await this.collection.uploadProfile(id,profileImage);
        const response = await this.helper.buildResponse(true, null, data);
        return response;
        // return { message: 'File uploaed successfully', url: frontendUrl };
    }

}