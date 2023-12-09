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

    async getAllProducts(): Promise<Product[]> {
        return await this.collection.getAllProducts();
    }

    async getProductByProductName(ProductName: string): Promise<Product> {
        return await this.collection.getProductByProductName(ProductName);
    }

    async Product(ProductName: string, ProductPrice: number, ProductStock: number) {
        return await this.collection.addProduct(ProductName, ProductPrice, ProductStock)
    }

    async updateProduct(productID: string, requestData: { ProductName: string, ProductPrice: number, ProductStock: number }) {
        return await this.collection.updateProduct(productID,requestData);
    }

    async deleteProduct(productID: string) {
        return await this.collection.deleteProduct(productID);
    }

    async sortedProduct(order: string): Promise<Product[]> {
        return await this.collection.sortedProduct(order);
      }

}