import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional, IsDate, isNotEmpty } from "class-validator";
export class SearchHotelDto {

    @IsString()
    @IsOptional()
    readonly country_id: string;

    @IsString()
    @IsOptional()
    readonly location_id: string;

    @IsOptional()
    readonly roomTypes: string[];

    @IsOptional()
    readonly amenities: string[];

    @IsOptional()
    readonly check_in: Date;

    @IsOptional()
    readonly check_out: Date;

    @IsNumber()
    @IsOptional()
    readonly total_rooms: number;

    @IsNumber()
    @IsOptional()
    readonly adults: number;

    @IsNumber()
    @IsOptional()
    readonly children: number;

    @IsOptional()
    readonly room_details: any[];

}