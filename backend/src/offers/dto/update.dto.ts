import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create.dto'; 

export class UpdateOfferDto extends PartialType(CreateOfferDto) {}