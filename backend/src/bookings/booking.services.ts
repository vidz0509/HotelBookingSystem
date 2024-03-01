import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { BookingCollection } from './booking.collection';
import { Booking } from './booking.schema';

import { CreateBookingDto } from './dto/create.dto';
import { UpdateBookingDto } from './dto/update.dto';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(
    private readonly bookingCollection: BookingCollection,
    private readonly helper: HelpersServices,
  ) { }

  async getAllBookings(): Promise<any> {
    let data = await this.bookingCollection.getAllBookings();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async createBooking(createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.bookingCollection.createBooking(createBookingDto);
      const response = await this.helper.buildResponse(true, null, booking);
      return response;
    } catch (error) {
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async getBookingById(id: string) {
    const country = await this.bookingCollection.getBookingById(id);
    const response = await this.helper.buildResponse(true, null, country);
    return response;
  }

  async hardDeleteCountry(countryId: string) {
    let data = await this.bookingCollection.hardDeleteCountry(countryId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

}
