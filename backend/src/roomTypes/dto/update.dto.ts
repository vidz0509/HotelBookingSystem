import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomTypeDto } from './create.dto';

export class UpdateRoomTypeDto extends PartialType(CreateRoomTypeDto) {}