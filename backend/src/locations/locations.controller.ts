import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateLocationDto } from './dto/create.dto';
import { LocationService } from './location.services';
import { UpdateLocationDto } from './dto/update.dto';

@Controller('locations')
export class LocationsController {

    constructor(private readonly locationService: LocationService) { }

    @Get()
    async findAll() {
        return this.locationService.getAllLocations();
    }

    @Post()
    async createLocation(@Body() createLocationDto: CreateLocationDto) {
        console.log(createLocationDto);
        return await this.locationService.createLocation(createLocationDto);
    }

    @Put(':id')
    async updateLocation(@Param('id') id: string,
        @Body() updateLocationDto: UpdateLocationDto) {
        return this.locationService.updateLocation(id, updateLocationDto);
    }

    @Put('/updatestatus/:id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: number) {
        return this.locationService.updateStatus(id, status);
    }

    @Get('/sortlocations')
    async sortedLocations(@Query('order') order: string) {
        return await this.locationService.sortedLocations(order);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.locationService.getLocationById(id);
    }

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.locationService.softDeleteLocation(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.locationService.hardDeleteLocation(id);
    }
}