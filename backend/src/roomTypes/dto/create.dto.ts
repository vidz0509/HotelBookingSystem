import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional, isNumber } from "class-validator";
export class CreateRoomTypeDto {

    @IsString()
    @IsNotEmpty()
    readonly roomtype_name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly max_adults: number;

    @IsNumber()
    @IsNotEmpty()
    readonly max_children: number;
}