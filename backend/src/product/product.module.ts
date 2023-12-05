import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.services';
import { ProductCollection } from './product.collection';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            },
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductCollection]
})

export class ProductModule { }