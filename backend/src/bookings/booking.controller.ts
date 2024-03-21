import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateBookingDto } from './dto/create.dto';
import { PaymentDto } from './dto/payment.dto';
import { BookingService } from './booking.services';

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

  @Post('/payment')
  async payment(@Body() paymentDto: PaymentDto) {
    return this.bookingServices.payment(paymentDto);
  }

}