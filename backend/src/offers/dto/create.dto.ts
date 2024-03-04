import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateOfferDto {

    @IsString()
    @IsNotEmpty()
    readonly offer_type: string;

    @IsString()
    @IsNotEmpty()
    readonly offer_code: string;

    @IsString()
    @IsNotEmpty()
    readonly offer_amount: string;

    @IsNotEmpty()
    readonly isOneTime: boolean;

    @IsOptional()
    readonly expired_on: Date;
}