import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateOfferDto } from './dto/create.dto';
import { Offers } from './offers.schema';
import { UpdateOfferDto } from './dto/update.dto';

@Injectable()
export class OffersCollection {

    constructor(@InjectModel('Offers') private offerModel: Model<Offers>) { }

    async getAllOffer(): Promise<Offers[]> {
        return await this.offerModel.find({
            isDeleted: false,
        })
            .sort({
                createdAt: -1
            });
    }

    async getOfferCount(): Promise<number> {
        return await this.offerModel.countDocuments({
            isDeleted: false,
        });
    }


    async sortedOffers(order: string): Promise<Offers[]> {
        return await this.offerModel.aggregate([
            { $sort: { offer_name: order == 'desc' ? -1 : 1 } },
            //   { $set: { createAt: new Date(), isDeleted: true } },
        ]);
    }

    async getOfferById(id: string): Promise<Offers> {
        return this.offerModel.findById(id);
    }

    async createOffer(createOfferDto: CreateOfferDto) {
        const newOffer = await new this.offerModel({

            offer_type: createOfferDto.offer_type,
            offer_code: createOfferDto.offer_code,
            offer_amount: createOfferDto.offer_amount,
            isOneTime: createOfferDto.isOneTime,
            expired_on: createOfferDto.expired_on,

            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newOffer.save();
    }

    async discountByCode(createOfferDto: CreateOfferDto) {
        const newDiscountByCode = await new this.offerModel({
            offer_code: createOfferDto.offer_code,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            isActive: true,
        });
        return newDiscountByCode.save();
    }

    async getOfferByCode(offerCode: string): Promise<Offers> {
        return this.offerModel.findOne({ offer_code: offerCode });
    }

    async updateOffer(OfferID: string, updateOfferDto: UpdateOfferDto) {
        updateOfferDto['updatedAt'] = new Date();
        return await this.offerModel.findByIdAndUpdate(
            OfferID,
            updateOfferDto,
            {
                new: true
            },
        );
    }

    async updateStatus(OfferID: string, status: number) {
        return this.offerModel.findByIdAndUpdate(
            OfferID,
            {
                isActive: status === 1 ? true : false,
            },
        );
    }

    async softDeleteOffer(offerId: string) {
        return this.offerModel.findByIdAndUpdate(
            offerId,
            {
                isDeleted: true,
            },
        );
    }

    async hardDeleteOffer(offerId: string) {
        return this.offerModel.deleteOne({ _id: offerId });
    }

    async uploadOffersImg(offerId: string, offerImage: string) {
        return await this.offerModel.findByIdAndUpdate(
            offerId,
            {
                offer_image: offerImage,
            },
            {
                new: true
            }
        );
    }

}