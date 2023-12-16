import { IsNotEmpty, IsNumber, IsString, MaxLength, IsEmail } from "class-validator";
export class SignInUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}