import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookingDto } from './dto/create.dto';
// import { SignInUserDto } from '../auth/dto/login.dto';
import { Booking } from './booking.schema';
import { UpdateBookingDto } from './dto/update.dto';
import { count } from 'console';

@Injectable()
export class BookingCollection {

    constructor(@InjectModel('Booking') private bookingModel: Model<Booking>) { }

    async getAllBookings(): Promise<Booking[]> {
        return await this.bookingModel.find({
            isDeleted: false,
        })
            .sort({
                createdAt: -1
            });
    }

    async getBookingById(id: string): Promise<Booking> {
        return this.bookingModel.findById(id);
    }

    async createBooking(createBookingDto: CreateBookingDto) {
        const newCountry = await new this.bookingModel({
            check_in: new Date(createBookingDto.check_in),
            check_out: new Date(createBookingDto.check_out),
            user_id: createBookingDto.user_id,
            hotel_id: createBookingDto.hotel_id,
            location_id: createBookingDto.location_id,
            country_id: createBookingDto.country_id,
            total_rooms: createBookingDto.total_rooms,
            total_adults: createBookingDto.total_adults,
            total_children: createBookingDto.total_children,
            room_details: createBookingDto.room_details,
            total_amount: createBookingDto.total_amount,
            transaction_id: createBookingDto.transaction_id,
            payment_id: createBookingDto.payment_id,
            payment_status: createBookingDto.payment_status,
            booking_status: createBookingDto.booking_status,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return newCountry.save();
    }

    async hardDeleteCountry(countryId: string) {
        return this.bookingModel.deleteOne({ _id: countryId });
    }

    async getBookedHotels(hotelIds:string[]){
        return this.bookingModel.find({ _id: { $nin : hotelIds } });
    }

}