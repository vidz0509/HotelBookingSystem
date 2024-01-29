import { PartialType } from '@nestjs/mapped-types';
import { CreateAmenitiesDto } from './create.dto';

export class UpdateAmenitiesDto extends PartialType(CreateAmenitiesDto) {}