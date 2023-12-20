import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail } from "class-validator";
export class CreateUserDto {
    @IsString()
    // @MaxLength(30)
    @IsNotEmpty()
    readonly fullname: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()  
    @MinLength(8)
    @MaxLength(12)
    readonly password: string;

    @IsString()
    readonly phone: string;
}