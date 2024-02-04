import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create.dto';
import { RoomTypeService } from './roomtype.services';
import { UpdateRoomTypeDto } from './dto/update.dto';

@Controller('roomtypes')
export class RoomTypesController {

    constructor(private readonly roomtypeService: RoomTypeService) { }

    @Get()
    async findAll() {
        return this.roomtypeService.getAllRoomTypes();
    }
    
    @Get('/count')
    async getRoomTypesCount(): Promise<number> {
        return this.roomtypeService.getRoomTypesCount();
    }

    @Post()
    async createRoomType(@Body() createRoomTypeDto: CreateRoomTypeDto) {
        console.log(createRoomTypeDto);
        return await this.roomtypeService.createRoomType(createRoomTypeDto);
    }

    @Put(':id')
    async updateRoomType(@Param('id') id: string,
        @Body() updateRoomTypeDto: UpdateRoomTypeDto) {
        return this.roomtypeService.updateRoomType(id, updateRoomTypeDto);
    }

    @Put('/updatestatus/:id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: number) {
        return this.roomtypeService.updateStatus(id, status);
    }

    @Get('/sortroomtypes')
    async sortedRoomTypes(@Query('order') order: string) {
        return await this.roomtypeService.sortedRoomTypes(order);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.roomtypeService.getRoomTypeById(id);
    }

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.roomtypeService.softDeleteRoomType(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.roomtypeService.hardDeleteRoomType(id);
    }
}