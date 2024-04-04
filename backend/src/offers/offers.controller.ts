import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put, Query, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { Response } from 'express';
import { CreateOfferDto } from './dto/create.dto';
import { OffersService } from './offers.services';
import { UpdateOfferDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('offers')
export class OffersController {

    constructor(private readonly offerService: OffersService) { }

    @Post()
    async createOffer(@Body() createOfferDto: CreateOfferDto) {
        console.log(createOfferDto);
        return await this.offerService.createOffer(createOfferDto);
    }

    @Get('/count')
    async getOffferCount(): Promise<number> {
        return this.offerService.getOfferCount();
    }

    @Get()
    async findAll() {
        return await this.offerService.getAllOffer();
    }


    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.offerService.getOfferById(id);
    }

    @Get(':code')
    async findOne(@Param('id') code: string) {
        return this.offerService.getOfferByCode(code);
    }

    @Post('calculateDiscount')
    async discountByCode(@Body() requestData: { offerCode: string, price: number }) {
        return await this.offerService.discountByCode(requestData);
    }

    @Put(':id')
    async updateOffer(@Param('id') id: string,
        @Body() updateOfferDto: UpdateOfferDto) {
        return this.offerService.updateOffer(id, updateOfferDto);
    }

    @Put('/updatestatus/:id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: number) {
        return this.offerService.updateStatus(id, status);
    }

    @Get('/sortoffers')
    async sortedOffers(@Query('order') order: string) {
        return await this.offerService.sortedOffers(order);
    }

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.offerService.softDeleteOffer(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.offerService.hardDeleteOffer(id);
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') offerId: string) {
        return this.offerService.uploadOffersImg(offerId, file);
    }

    @Get('uploads/offersImg/:filename')
    async serveFile(@Param('filename') filname: string, @Res() res: Response) {
        return res.sendFile(filname, { root: 'uploads/offersImg' });
    }
}