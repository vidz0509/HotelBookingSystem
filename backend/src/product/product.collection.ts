import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './product.schema';

@Injectable()
export class ProductCollection {

    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async addProduct(ProductName: string, ProductPrice: number, ProductStock: number) {
        const newProduct = await new this.productModel(
            {
                ProductName : ProductName,
                ProductPrice : ProductPrice,
                ProductStock : ProductStock
            }
        );
        return newProduct.save();
    }
}