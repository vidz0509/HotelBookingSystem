import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateLocationDto } from './dto/create.dto';
import { LocationService } from './location.services';
import { UpdateLocationDto } from './dto/update.dto';

@Controller('location')
export class LocationController {

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

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.locationService.deleteLocation(id);
    }

    @Get('/sortlocations')
    async sortedLocations(@Query('order') order: string) {
      return await this.locationService.sortedLocations(order);
    }
}