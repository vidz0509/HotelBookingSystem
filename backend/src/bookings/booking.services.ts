import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { BookingCollection } from './booking.collection';
import { Booking } from './booking.schema';

import { CreateBookingDto } from './dto/create.dto';
import { UpdateBookingDto } from './dto/update.dto';
import axios from 'axios';
import { PaymentDto } from './dto/payment.dto';

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

  async payment(paymentDto: PaymentDto) {

    
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer ' + process.env.REVIO_PAY_TOKEN
      },
      body: JSON.stringify({
        purchase: {
          currency: "INR",
          language: "en",
          products: [{
            "name": "My product or service",
            "price": 100
          }],
        },
        client_id: "a0572ffd-877b-41f3-a0a5-531390f83827",
        brand_id: process.env.REVIO_PAY_BRANDID,
        success_redirect:  process.env.SITE_URL,
        failure_redirect: process.env.SITE_URL,
        cancel_redirect: process.env.SITE_URL,
      })
    };

    try {
      const purchaseResponse = await fetch(`${process.env.REVIO_PAY_URL}/purchases/`, options);
      if (!purchaseResponse.ok) {
        throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Network response was not ok'));
      }
      const result = await purchaseResponse.json();
      const finalResponse = await this.helper.buildResponse(true, null, result);
      return finalResponse;
    } catch (error) {
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }

  }

}
