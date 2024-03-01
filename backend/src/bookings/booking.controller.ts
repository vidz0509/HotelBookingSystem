import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateBookingDto } from './dto/create.dto';
import { BookingService } from './booking.services';
import { UpdateBookingDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('bookings')
export class BookingController {

  constructor(private readonly bookingServices: BookingService) { }

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingServices.createBooking(createBookingDto);
  }

  @Get()
  async findAll() {
    return await this.bookingServices.getAllBookings();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.bookingServices.getBookingById(id);
  }

  @Delete(':id')
  async hardDelete(@Param('id') id: string) {
    return this.bookingServices.hardDeleteCountry(id);
  }
}