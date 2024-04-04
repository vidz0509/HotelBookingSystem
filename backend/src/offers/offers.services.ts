import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { OffersCollection } from './offers.collection';
import { Offers } from './offers.schema';

import { CreateOfferDto } from './dto/create.dto';
import { UpdateOfferDto } from './dto/update.dto';

@Injectable()
export class OffersService {
  private readonly logger = new Logger(OffersService.name);
  constructor(
    private readonly offerCollection: OffersCollection,
    private readonly helper: HelpersServices,
  ) { }

  async createOffer(createOfferDto: CreateOfferDto) {
    try {
      const newOffer = await this.offerCollection.createOffer(createOfferDto);
      const response = await this.helper.buildResponse(true, null, newOffer);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async getOfferByCode(offerCode: string) {
    const offer = await this.offerCollection.getOfferByCode(offerCode);
    return offer;
  }

  async discountByCode(requestData: { offerCode: string, price: number }) {
    const offerDetails = await this.offerCollection.getOfferByCode(requestData.offerCode);
    if (!offerDetails) {
      throw new BadRequestException(
        await this.helper.buildResponse(false, `Offer Code is invalid.`),
      );
    }

    if (offerDetails.expired_on) {
      const expDate = new Date(offerDetails.expired_on);
      const currentDate = new Date();
      if (expDate < currentDate) {
        throw new BadRequestException(
          await this.helper.buildResponse(false, `Sorry, this offer is expired now.`),
        );
      }
    }

    try {
      const discount = requestData.price * parseInt(offerDetails.offer_amount) / 100;
      const result = {
        applied_coupon: offerDetails,
        discount: discount
      }
      const response = await this.helper.buildResponse(true, null, result);
      return response;
    } catch (error) {
      console.debug(`Failed to apply coupon: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async checkIfOfferCodeExists(offer_code: string) {
    const offer = await this.offerCollection.getOfferByCode(offer_code);
    return offer;
  }

  async getAllOffer(): Promise<any> {
    let data = await this.offerCollection.getAllOffer();
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async getOfferCount(): Promise<any> {
    let count = await this.offerCollection.getOfferCount();
    const response = await this.helper.countResponse(true, null, count);
    return response;
  }

  async updateOffer(userId: string, updateOfferDto: UpdateOfferDto) {
    let data = await this.offerCollection.updateOffer(userId, updateOfferDto);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async updateStatus(OfferID: string, status: number) {
    console.log(OfferID)
    let data = await this.offerCollection.updateStatus(OfferID, status);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
  }

  async sortedOffers(order: string): Promise<Offers[]> {
    return await this.offerCollection.sortedOffers(order);
  }

  async getOfferById(id: string) {
    const offer = await this.offerCollection.getOfferById(id);
    const response = await this.helper.buildResponse(true, null, offer);
    return response;
  }

  async softDeleteOffer(offerId: string) {
    console.log(offerId)
    let data = await this.offerCollection.softDeleteOffer(offerId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async hardDeleteOffer(offerId: string) {
    let data = await this.offerCollection.hardDeleteOffer(offerId);
    const response = await this.helper.buildResponse(true, null, null);
    return response;
  }

  async uploadOffersImg(offerId: string, file: Express.Multer.File) {
    const offerImage = `${process.env.APP_URL}/offers/uploads/offersImg/${file.filename}`;
    let data = await this.offerCollection.uploadOffersImg(offerId, offerImage);
    const response = await this.helper.buildResponse(true, null, data);
    return response;
    // return { message: 'File uploaed successfully', url: frontendUrl };
  }
}
