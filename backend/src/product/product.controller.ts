import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put } from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.services';

@Controller('product')
export class ProductController {

    @Get()
    async findAll() {
        return this.productService.getAllProducts();
    }

    @Get(':ProductName')
    async findOne(@Param('ProductName') ProductName: string) {
        return this.productService.getProductByProductName(ProductName);
    }

    constructor(private readonly productService: ProductService) { }

    @Post('/addProduct')
    async Product(@Body() requestData: { ProductName: string, ProductPrice: number, ProductStock: number }) {
        return await this.productService.Product(requestData.ProductName, requestData.ProductPrice, requestData.ProductStock);
    }
}

