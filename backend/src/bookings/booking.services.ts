import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { BookingCollection } from './booking.collection';
import { Booking } from './booking.schema';

import { CreateBookingDto } from './dto/create.dto';
import { UpdateBookingDto } from './dto/update.dto';
import axios from 'axios';
import { PaymentDto } from './dto/payment.dto';
import { UsersCollection } from 'src/users/users.collection';
import { HotelsCollection } from 'src/hotels/hotels.collection';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(
    private readonly bookingCollection: BookingCollection,
    private readonly usersCollection: UsersCollection,
    private readonly hotelCollection: HotelsCollection,
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

    const userId = paymentDto?.user_id;

    if (userId) {
      const currentUserData = await this.usersCollection.getUser(userId);
      const hotelData = await this.hotelCollection.getHotelById(paymentDto.hotelId);
      if (hotelData) {

        /* Create client in Revio */

        const clientoption = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer ' + process.env.REVIO_PAY_TOKEN
          },
          body: JSON.stringify({
            email: paymentDto.user_detail[0].email,
            phone: paymentDto.user_detail[0].contact,
            full_name: currentUserData.fullname,
            registration_number: userId,
            country: 'IN',
          })
        };
        try {
          const customerResponse = await fetch(`${process.env.REVIO_PAY_URL}/clients/`, clientoption);
          const customerResult = await customerResponse.json();
          if (!customerResponse.ok) {
            if (customerResult?.__all__[0]?.message) {
              const errorMessage = customerResult?.__all__[0]?.message;
              throw new InternalServerErrorException(await this.helper.buildResponse(false, errorMessage));
            }
            throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong!'));
          }

          if (customerResult.id) {

            /* Create purchase for the created client */

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
                    "name": hotelData[0].hotel_name,
                    "price": paymentDto.finalSelectedRooms[0].amount
                  }],
                },
                client_id: customerResult.id,
                brand_id: process.env.REVIO_PAY_BRANDID,
                success_redirect: process.env.SITE_URL,
                failure_redirect: process.env.SITE_URL,
                cancel_redirect: process.env.SITE_URL,
              })
            };

            const purchaseResponse = await fetch(`${process.env.REVIO_PAY_URL}/purchases/`, options);
            const purchaseResult = await purchaseResponse.json();

            if (!purchaseResponse.ok) {
              if (purchaseResult?.__all__[0]?.message) {
                const errorMessage = purchaseResult?.__all__[0]?.message;
                throw new InternalServerErrorException(await this.helper.buildResponse(false, errorMessage));
              }
              throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong!'));
            }
            const finalCustomerResponse = await this.helper.buildResponse(true, null, purchaseResult);
            return finalCustomerResponse;
          }
        } catch (error) {
          throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
        }
      } else {
        throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Invalid Hotel'));
      }

    } else {
      throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Invalid User'));
    }
  }



}
