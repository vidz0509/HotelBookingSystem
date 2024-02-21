import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateLocationDto {
    
    @IsString()
    @IsNotEmpty()
    readonly country_id: string;

    @IsString()
    @IsNotEmpty()
    readonly location_code: string;

    @IsString()
    @IsNotEmpty()
    readonly location_name: string;
  
    @IsString()
    @IsOptional()
    readonly location_image: string;
}