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
      url: 'https://gate.reviopay.com/api/v1/purchases/',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer GyUjxb883ZGCHlIRjKXexWx3_5ORCg3r-_pkZz9ctDog1SE48ZkLWnYWpdJSmGFIgnvUCZe4rQ4ZibFYKCWVsA==',
      },
      body: JSON.stringify({
        "client_id": "1ba24d02-4b8e-4b22-9f37-fef9b09e28a3",
        "payment_method_whitelist": ["visa", "mastercard", "maestro", "ozow", "capitec_pay"],
        "purchase": {
          "currency": "ZAR",
          "language": "en",
          "products": [
            {
              "name": "My product or service",
              "price": 100
            }
          ]
        },
        "brand_id": "ce8b9ed8-bdc0-485c-9ad7-b6672cda895f",
        "send_receipt": false,
        "success_redirect": "https://www.cnn.com",
        "failure_redirect": "https://www.cnn.com",
        "cancel_redirect": "https://www.cnn.com"
      })
    };

    fetch('https://gate.reviopay.com/api/v1/purchases/', options)
      .then(response => response.json())
      .then(response => console.log(JSON.stringify(response)))
      .catch(err => console.error(err));

  }

}
