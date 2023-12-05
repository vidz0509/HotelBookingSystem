import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { Product, ProductDocument, ProductSchema } from './product.schema';
import { ProductCollection } from './product.collection';

@Injectable()
export class ProductService {

    constructor(
        private readonly collection: ProductCollection,
    ) { }

    async Product(ProductName: string, ProductPrice: number, ProductStock: number ){
        return await this.collection.addProduct(ProductName,ProductPrice,ProductStock)
    }

}