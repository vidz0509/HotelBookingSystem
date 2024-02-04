import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateAmenitiesDto } from './dto/create.dto';
import { AmenitiesService } from './amenities.services';
import { UpdateAmenitiesDto } from './dto/update.dto';

@Controller('amenities')
export class AmenitiessController {

    constructor(private readonly amenitiesService: AmenitiesService) { }

    @Get()
    async findAll() {
        return this.amenitiesService.getAllAmenities();
    }
    
    @Get('/count')
    async getAmenitiesCount(): Promise<number> {
        return this.amenitiesService.getAmenitiesCount();
    }

    @Post()
    async createAmenities(@Body() createAmenitiesDto: CreateAmenitiesDto) {
        console.log(createAmenitiesDto);
        return await this.amenitiesService.createAmenities(createAmenitiesDto);
    }

    @Put(':id')
    async updateAmenities(@Param('id') id: string,
        @Body() updateAmenitiesDto: UpdateAmenitiesDto) {
        return this.amenitiesService.updateAmenities(id, updateAmenitiesDto);
    }

    @Put('/updatestatus/:id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: number) {
        return this.amenitiesService.updateStatus(id, status);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.amenitiesService.getAmenitiesById(id);
    }

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.amenitiesService.softDeleteAmenities(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.amenitiesService.hardDeleteAmenities(id);
    }

    @Get('/sortamenitiess')
    async sortedAmenitiess(@Query('order') order: string) {
        return await this.amenitiesService.sortedAmenitiess(order);
    }
}