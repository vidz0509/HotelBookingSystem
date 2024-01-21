import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateCountryDto {
    // @IsString()
    // @IsNotEmpty()
    // readonly country_id: string;

    @IsString()
    @IsNotEmpty()
    readonly country_code: string;

    @IsString()
    @IsNotEmpty()
    readonly country_name: string;
  
    // @IsString()
    // @IsNotEmpty()
    readonly country_image: string[];
}