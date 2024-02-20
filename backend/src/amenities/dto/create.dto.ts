import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateAmenitiesDto {

    @IsString()
    @IsNotEmpty()
    readonly amenities_name: string;

    @IsString()
    @IsNotEmpty()
    readonly amenities_icon: string;
}