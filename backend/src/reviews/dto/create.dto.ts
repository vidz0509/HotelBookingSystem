import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateReviewDto {

    @IsString()
    @IsNotEmpty()
    readonly review_text: string;

    @IsString()
    @IsNotEmpty()
    readonly user_id: string;

    @IsString()
    @IsNotEmpty()
    readonly hotel_id: string;

    @IsNumber()
    @IsNotEmpty()
    readonly rating : number;
}