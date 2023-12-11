import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { User, UsersDocument, UserSchema } from './users.schema';
import { UsersCollection } from './users.collection';
import { HelpersServices } from 'src/auth/services/helpers/helpers.services';

@Injectable()
export class UsersService {

    constructor(
        private readonly collection: UsersCollection,
    ) { }

    async getAllUsers(): Promise<User[]> {
        return await this.collection.getAllUsers();
    }

    async register(fullname: string, email: string, password: string, confirmpassword: string) {
        return await this.collection.createUser(fullname, email, password, confirmpassword);
    }

    async getUserByName(name: string): Promise<User> {
        return await this.collection.getUserByName(name);
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.collection.getUserByEmail(email);
    }

    async updateUser(userID: string, requestData: { name: string, age: number, hobby: string }) {
        return await this.collection.updateUser(userID,requestData);
    }

    async deleteUser(userID: string) {
        return await this.collection.deleteUser(userID);
    }

    async sortedUsers(order: string): Promise<User[]> {
        return await this.collection.sortedUsers(order);
      }

}