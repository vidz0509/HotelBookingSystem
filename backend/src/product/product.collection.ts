import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './product.schema';

@Injectable()
export class ProductCollection {

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async addProduct(ProductName: string, ProductPrice: number, ProductStock: number) {
        const newProduct = await new this.productModel(
            {
                ProductName: ProductName,
                ProductPrice: ProductPrice,
                ProductStock: ProductStock
            }
        );
        return newProduct.save();
    }

    async getProductByProductName(ProductName: string): Promise<Product> {
        return this.productModel.findOne({ ProductName: ProductName });
    }

    async updateProduct(productID: string, requestData: { ProductName: string, ProductPrice: number, ProductStock: number }) {
        return await this.productModel.findByIdAndUpdate(
            productID,
            {
                ProductName: requestData.ProductName,
                ProductPrice: requestData.ProductPrice,
                ProductStock: requestData.ProductStock
            },
            {
                new: true
            }
        );
    }

    async deleteProduct(productID: string) {
        return this.productModel.deleteOne(
            { _id: productID }
        );
    }

    async sortedProduct(order: string): Promise<Product[]> {
        return await this.productModel.aggregate([
          { $sort: { ProductName: order == 'desc' ? -1 : 1 } },
        ]);
      }
    
}