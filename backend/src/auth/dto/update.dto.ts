import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../dto/register.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}