import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create.dto'; 

export class UpdateHotelDto extends PartialType(CreateHotelDto) {}