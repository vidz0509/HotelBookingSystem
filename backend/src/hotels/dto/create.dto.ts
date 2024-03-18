import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateHotelDto {

    @IsString()
    @IsNotEmpty()
    readonly country_id: string;

    @IsString()
    @IsNotEmpty()
    readonly location_id: string;

    @IsString()
    @IsNotEmpty()
    readonly hotel_code: string;

    @IsString()
    @IsNotEmpty()
    readonly hotel_name: string;

    @IsNotEmpty()
    readonly total_rooms: number;

    @IsNotEmpty()
    readonly amenities: string[];

    @IsString()
    @IsNotEmpty()
    readonly hotel_address: string;

    readonly average_rating: string;

    readonly hotel_image: string[];
}