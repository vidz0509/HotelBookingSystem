import { User } from './../users/users.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from "mongoose";
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
        return await this.bookingModel.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: { $toObjectId: "$user_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$userId"] }
                            }
                        },
                        {
                            $project: {
                                fullname: 1,
                            }
                        }
                    ],
                    as: 'users_details'
                }
            },
            {
                $lookup: {
                    from: 'countries',
                    let: { countryId: { $toObjectId: "$country_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$countryId"] }
                            }
                        },
                        {
                            $project: {
                                country_code: 1,
                                country_name: 1
                            }
                        }
                    ],
                    as: 'country_details'
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    let: { locationId: { $toObjectId: "$location_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$locationId"] }
                            }
                        },
                        {
                            $project: {
                                location_code: 1,
                                location_name: 1
                            }
                        }
                    ],
                    as: 'location_details'
                }
            },
            {
                $lookup: {
                    from: 'hotels',
                    let: { hotelId: { $toObjectId: "$hotel_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$hotelId"] }
                            }
                        },
                        {
                            $project: {
                                hotel_image: 1,
                                hotel_name: 1
                            }
                        }
                    ],
                    as: 'hotel_details'
                }
            },
            {
                $lookup: {
                    from: 'room',
                    let: { roomId: { $toObjectId: "$room_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$roomId"] }
                            }
                        },
                        {
                            $project: {
                                room_name: 1
                            }
                        }
                    ],
                    as: 'room_details'
                }
            },
        ]);
    }

    async getBookingsCount(): Promise<number> {
        return await this.bookingModel.countDocuments();
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
            user_details: createBookingDto.user_details,
            discount: createBookingDto.discount,
            total_amount: createBookingDto.total_amount,
            transaction_id: createBookingDto.transaction_id,
            payment_method: createBookingDto.payment_method,
            payment_status: createBookingDto.payment_status,
            booking_status: createBookingDto.booking_status,
            checkout_url: createBookingDto.checkout_url,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return newCountry.save();
    }

    async hardDeleteCountry(countryId: string) {
        return this.bookingModel.deleteOne({ _id: countryId });
    }

    async getBookedHotels(hotelIds: string[]) {
        return this.bookingModel.find({ _id: { $nin: hotelIds } });
    }

    async getBookingByUserId(user_id: string): Promise<Booking[]> {
        return await this.bookingModel.aggregate([
            {
                $match: {
                    user_id: user_id,
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: { $toObjectId: "$user_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$userId"] }
                            }
                        },
                        {
                            $project: {
                                fullname: 1,
                            }
                        }
                    ],
                    as: 'users_details'
                }
            },
            {
                $lookup: {
                    from: 'countries',
                    let: { countryId: { $toObjectId: "$country_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$countryId"] }
                            }
                        },
                        {
                            $project: {
                                country_code: 1,
                                country_name: 1
                            }
                        }
                    ],
                    as: 'country_details'
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    let: { locationId: { $toObjectId: "$location_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$locationId"] }
                            }
                        },
                        {
                            $project: {
                                location_code: 1,
                                location_name: 1
                            }
                        }
                    ],
                    as: 'location_details'
                }
            },
            {
                $lookup: {
                    from: 'hotels',
                    let: { hotelId: { $toObjectId: "$hotel_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$hotelId"] }
                            }
                        },
                        {
                            $project: {
                                hotel_image: 1,
                                hotel_name: 1
                            }
                        }
                    ],
                    as: 'hotel_details'
                }
            },
            {
                $lookup: {
                    from: 'room',
                    let: { roomId: { $toObjectId: "$room_id" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$roomId"] }
                            }
                        },
                        {
                            $project: {
                                room_name: 1
                            }
                        }
                    ],
                    as: 'room_details'
                }
            },
        ]);
    }
}