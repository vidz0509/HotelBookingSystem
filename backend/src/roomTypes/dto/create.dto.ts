import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateRoomTypeDto {

    @IsString()
    @IsNotEmpty()
    readonly roomtype_name: string;
}