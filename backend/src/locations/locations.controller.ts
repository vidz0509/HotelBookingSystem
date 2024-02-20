import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put, Query, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { Response } from 'express';
import { CreateLocationDto } from './dto/create.dto';
import { LocationService } from './location.services';
import { UpdateLocationDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('locations')
export class LocationsController {

    constructor(private readonly locationService: LocationService) { }

    @Get()
    async findAll(@Query('size') size?: number) {
        return this.locationService.getAllLocations(size);
    }

    @Get('/count')
    async getLocationsCount(): Promise<number> {
        return this.locationService.getLocationsCount();
    }

    @Get('/sortlocations')
    async sortedLocations(@Query('order') order: string) {
        return await this.locationService.sortedLocations(order);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.locationService.getLocationById(id);
    }

    @Get('getlocationbycountry/:id')
    async getLocationByCountry(@Param('id') id: string) {
        return this.locationService.getLocationByCountry(id);
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

    @Put('/softdelete/:id')
    async softDelete(@Param('id') id: string) {
        return this.locationService.softDeleteLocation(id);
    }

    @Delete(':id')
    async hardDelete(@Param('id') id: string) {
        return this.locationService.hardDeleteLocation(id);
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') locationID: string) {
        return this.locationService.uploadImg(locationID,file);
    }

    @Get('uploads/locationsImg/:filename')
    async serveFile(@Param('filename') filname: string, @Res() res: Response) {
        return res.sendFile(filname, { root: 'uploads/locationsImg' });
    }
}