import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { User, UsersDocument, UserSchema } from './users.schema';
import { UsersCollection } from './users.collection';

@Injectable()
export class UsersService {

    constructor(
        private readonly collection: UsersCollection,
    ) { }

    async getAllUsers(): Promise<User[]> {
        return await this.collection.getAllUsers();
    }

    async register(name: string, age: number, hobby: string) {
        return await this.collection.createUser(name, age, hobby)
    }


    async getUserByName(name: string): Promise<User> {
        return await this.collection.getUserByName(name);
    }

}