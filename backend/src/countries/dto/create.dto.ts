import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateUserDto {
    // @IsString()
    // @IsNotEmpty()
    // readonly country_id: string;

    @IsString()
    @IsNotEmpty()
    readonly country_name: string;
  
    @IsString()
    @IsNotEmpty()
    readonly country_image: string[];
}