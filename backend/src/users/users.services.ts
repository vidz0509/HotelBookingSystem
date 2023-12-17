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
    ) { }

    async getAllUsers(): Promise<User[]> {
        return await this.collection.getAllUsers();
    }

    async register(createUserDto) {
        return await this.collection.createUser(createUserDto);
    }

    // async getUserByName(name: string): Promise<User> {
    //     return await this.collection.getUserByName(name);
    // }

    async getUser(Id: string) {
        return await this.collection.getUser(Id);
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.collection.getUserByEmail(email);
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