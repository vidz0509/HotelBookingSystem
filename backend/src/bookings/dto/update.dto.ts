import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create.dto'; 

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}