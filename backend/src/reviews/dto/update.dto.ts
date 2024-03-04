import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create.dto'; 

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}