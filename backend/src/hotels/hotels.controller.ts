import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateHotelDto } from './dto/create.dto';
import { HotelsService } from './hotels.services';
import { UpdateHotelDto } from './dto/update.dto';

@Controller('hotels')
export class HotelsController {

    constructor(private readonly hotelService: HotelsService) { }

    @Post()
    async createHotel(@Body() createHotelDto: CreateHotelDto) {
        console.log(createHotelDto);
        return await this.hotelService.createHotel(createHotelDto);
    }

    @Put(':id')
    async updateHotel(@Param('id') id: string,
        @Body() updateHotelDto: UpdateHotelDto) {
        return this.hotelService.updateHotel(id, updateHotelDto);
    }

    @Get('/sorthotels')
    async sortedHotels(@Query('order') order: string) {
        return await this.hotelService.sortedHotels(order);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.hotelService.getHotelById(id);
    }

    @Get()
    async findAll() {
        return await this.hotelService.getAllHotel();
    }
    // @Delete(':id')
    // async remove(@Param('id') id: string) {
    //     return this.hotelService.deleteHotel(id);
    // }

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.hotelService.softDeleteHotel(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.hotelService.hardDeleteHotel(id);
    }
}