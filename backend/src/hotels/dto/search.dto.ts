import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional, IsDate, isNotEmpty } from "class-validator";
export class SearchHotelDto {

    @IsString()
    @IsOptional()
    readonly location_id: string;

    @IsString()
    @IsNotEmpty()
    readonly country_id: string;

    // @IsDate()
    // @IsNotEmpty()
    // readonly checkIn: Date;

    // @IsDate()
    // @IsNotEmpty()
    // readonly checkOut: Date;

    @IsNumber()
    @IsOptional()
    readonly total_rooms: number;

    @IsNumber()
    @IsOptional()
    readonly adults: number;

    @IsNumber()
    @IsOptional()
    readonly children: number;

}