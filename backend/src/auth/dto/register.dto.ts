import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail } from "class-validator";
export class CreateUserDto {
    @IsString()
    // @MaxLength()
    @IsNotEmpty()
    readonly fullname: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @MinLength(8)
    @MaxLength(12)
    @IsString()
    @IsNotEmpty()   
    readonly password: string;

    @IsString()
    readonly phone: string;
}