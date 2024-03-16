import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { BookingCollection } from './booking.collection';
import { Booking } from './booking.schema';

import { CreateBookingDto } from './dto/create.dto';
import { UpdateBookingDto } from './dto/update.dto';
import axios from 'axios';

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

  async payment() {
    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': 'Bearer Jcy0PEL4b3WAlxzMb6DmfUn0sXI7Q1_HY07bYS3Lyygrxv0SuAjJ4fa5qTCURHSFLoHSnRYK4L8oroFi5lWcaw==',
      },
      body: JSON.stringify({
        purchase: {
          products: [{ quantity: 1, discount: 0, tax_percent: 0 }],
        },
        client_id: "2e9ee5f2-2166-49dd-a795-d00060d9677a",
        brand_id: "ce8b9ed8-bdc0-485c-9ad7-b6672cda895f",
      })
    };

    console.log(options);

    fetch('https://gate.revio.co.za/api/v1/purchases/', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

}
