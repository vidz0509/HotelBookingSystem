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
import { EmailService } from 'src/email/email.service';
import { error } from 'console';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(
    private readonly bookingCollection: BookingCollection,
    private readonly usersCollection: UsersCollection,
    private readonly hotelCollection: HotelsCollection,
    private readonly helper: HelpersServices,
    private readonly emailService: EmailService,
  ) { }

  async getAllBookings(): Promise<any> {
    let data = await this.bookingCollection.getAllBookings();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getBookingsCount(): Promise<any> {
    let count = await this.bookingCollection.getBookingsCount();
    const response = await this.helper.countResponse(true, null, count);
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

  async getBookingByUserId(user_id: string) {
    const booking = await this.bookingCollection.getBookingByUserId(user_id);
    const response = await this.helper.buildResponse(true, null, booking);
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
      if (hotelData.length > 0) {
        let revio_client_id = ""
        if(!currentUserData.revio_client_id){

          const clientoption = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer ' + process.env.REVIO_PAY_TOKEN
            },
            body: JSON.stringify({
              email: currentUserData.email,
              phone: currentUserData.phone,
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
              const currentClientData = await this.usersCollection.updateClient(customerResult.id,userId);          
  
              revio_client_id = customerResult.id
              
              
            }
          } catch (error) {
            throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
          }
        }
        else{
          revio_client_id=currentUserData.revio_client_id
        }
        if(revio_client_id == ""){
          throw new InternalServerErrorException(await this.helper.buildResponse(false, "Cannot found revio client"));
        }
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
                "price": ((paymentDto.finalSelectedRooms[0].amount - paymentDto.discount)) * 100
              }],
            },
            client_id: revio_client_id,
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

        let createBookingDto : CreateBookingDto = {
          check_in : paymentDto.check_in,
          check_out : paymentDto.check_out,
          user_id: userId,
          hotel_id: paymentDto.hotelId,
          location_id : hotelData[0].location_id,
          country_id : hotelData[0].country_id,
          room_type_id : paymentDto.finalSelectedRooms[0]?.room_type_id,
          total_rooms : paymentDto.finalSelectedRooms[0]?.rooms,
          total_adults : paymentDto.finalSelectedRooms[0]?.adult,
          total_children : paymentDto.finalSelectedRooms[0]?.children,
          room_details : paymentDto.roomList,
          user_details : paymentDto.user_detail,
          discount : paymentDto.discount,
          total_amount : paymentDto.finalSelectedRooms[0]?.amount,
          transaction_id : purchaseResult.id,
          payment_method : "Credit/Debit Card",
          payment_status : "complete",
          booking_status : "active",
          checkout_url : purchaseResult.checkout_url
        }
        return await this.createBooking(createBookingDto);
      } else {
        throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Invalid Hotel'));
      }

    } else {
      throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Invalid User'));
    }
  }
  
async sendBill(requestData: { fullname:string,email: string, check_in: Date, check_out: Date, hotel_Name: string, hotel_Address: string, totalRooms: string, price: string }) {

  try {
    this.logger.debug(`Sending email to ${requestData.email}`);
    await this.emailService.sendBillToUser(requestData.fullname, requestData.email, requestData.check_in, requestData.check_out, requestData.hotel_Name,requestData.hotel_Address, requestData.totalRooms, requestData.price);
    return await this.helper.buildResponse(true);
  } catch (error) {
    if (error) {
      this.logger.error(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong.'));
    }
  }
}
}
