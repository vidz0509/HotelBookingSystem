import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put, Query, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { Response } from 'express';
import { CreateRoomDto } from './dto/create.dto';
import { RoomsService } from './rooms.services';
import { UpdateRoomDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rooms')
export class RoomsController {

    constructor(private readonly roomService: RoomsService) { }

    @Post()
    async createRoom(@Body() createRoomDto: CreateRoomDto) {
        console.log(createRoomDto);
        return await this.roomService.createRoom(createRoomDto);
    }

    @Get()
    async findAll() {
        return await this.roomService.getAllRoom();
    }

    @Get('/count')
    async getRoomCount(): Promise<number> {
        return this.roomService.getRoomCount();
    }

    @Put(':id')
    async updateRoom(@Param('id') id: string,
        @Body() updateRoomDto: UpdateRoomDto) {
        return this.roomService.updateRoom(id, updateRoomDto);
    }

    @Put('/updatestatus/:id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: number) {
        return this.roomService.updateStatus(id, status);
    }

    @Get('/sortrooms')
    async sortedRooms(@Query('order') order: string) {
        return await this.roomService.sortedRooms(order);
    }

    @Get('RoomByHotel/:id')
    async getRoomByHotelId(@Param('id') hotel_id: string) {
        return this.roomService.getRoomByHotelId(hotel_id);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.roomService.getRoomById(id);
    }

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.roomService.softDeleteRoom(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.roomService.hardDeleteRoom(id);
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') roomId: string) {
        return this.roomService.uploadRoomsImg(roomId, file);
    }

    @Get('uploads/roomsImg/:filename')
    async serveFile(@Param('filename') filname: string, @Res() res: Response) {
        return res.sendFile(filname, { root: 'uploads/roomsImg' });
    }
}