import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create.dto'; 

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}