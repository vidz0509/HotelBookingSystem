import { Controller, Get, Post,Query, Req, Res, Body, HttpStatus, Param, Delete, Put } from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.services';

@Controller('product')
export class ProductController {

    @Get()
    async findAll() {
        return this.productService.getAllProducts();
    }

    @Get('/sortproduct')
    async sortedProduct(@Query('order') order: string) {
        return await this.productService.sortedProduct(order);
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

    @Put(':id')
    async updateProduct(@Param('id') id: string,
        @Body() requestData: { ProductName: string, ProductPrice: number, ProductStock: number }) {
        return this.productService.updateProduct(id, requestData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}

