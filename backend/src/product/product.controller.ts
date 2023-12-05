import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put} from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.services';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post('/addProduct')
    async Product(@Body() requestData : {ProductName: string, ProductPrice: number, ProductStock: number }) {
        return await this.productService.Product(requestData.ProductName, requestData.ProductPrice, requestData.ProductStock);
    }
}

