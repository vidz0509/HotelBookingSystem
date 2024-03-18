import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put, Query, UseInterceptors, UploadedFile, UploadedFiles, } from '@nestjs/common';
import { Response } from 'express';
import { CreateHotelDto } from './dto/create.dto';
import { HotelsService } from './hotels.services';
import { UpdateHotelDto } from './dto/update.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { SearchHotelDto } from './dto/search.dto';

@Controller('hotels')
export class HotelsController {

    constructor(private readonly hotelService: HotelsService) { }

    @Put('updateHotelAmenities')
    async updateHotelAmenities(){
        return await this.hotelService.updateHotelAmenities();
    }

    @Put('updateHotels')
    async updateHotels(){
        return await this.hotelService.getAllHotelIDs();
    }

    @Post('/searchHotels')
    async searchHotels(@Body() searchHotelDto: SearchHotelDto) {
        return await this.hotelService.searchHotels(searchHotelDto);
    }
    
    @Post()
    async createHotel(@Body() createHotelDto: CreateHotelDto) {
        console.log(createHotelDto);
        return await this.hotelService.createHotel(createHotelDto);
    }


    @Get()
    async findAll(@Query('size') size?: number) {
        return await this.hotelService.getAllHotel(size);
    }

    @Get('/count')
    async getHotelCount(): Promise<number> {
        return this.hotelService.getHotelCount();
    }

    @Put(':id')
    async updateHotel(@Param('id') id: string,
        @Body() updateHotelDto: UpdateHotelDto) {
        return this.hotelService.updateHotel(id, updateHotelDto);
    }

    @Put('/updatestatus/:id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: number) {
        return this.hotelService.updateStatus(id, status);
    }

    @Get('/sorthotels')
    async sortedHotels(@Query('order') order: string) {
        return await this.hotelService.sortedHotels(order);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.hotelService.getHotelById(id);
    }

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.hotelService.softDeleteHotel(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.hotelService.hardDeleteHotel(id);
    }

    @Post('upload/:id')
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Param('id') hotelId: string) {
        return this.hotelService.uploadHotelsImg(hotelId, files);
    }

    @Get('uploads/hotelsImg/:filename')
    async serveFile(@Param('filename') filname: string, @Res() res: Response) {
        return res.sendFile(filname, { root: 'uploads/hotelsImg' });
    } 
}