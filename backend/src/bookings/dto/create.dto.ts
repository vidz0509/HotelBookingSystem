import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional, isDate, IsDate } from "class-validator";
export class CreateBookingDto {

    @IsNotEmpty()
    readonly check_in: Date;

    @IsNotEmpty()
    readonly check_out: Date;

    @IsString()
    @IsNotEmpty()
    readonly user_id: string;

    @IsString()
    @IsNotEmpty()
    readonly hotel_id: string;

    @IsString()
    @IsNotEmpty()
    readonly location_id: string;

    @IsString()
    @IsNotEmpty()
    readonly country_id: string;

    readonly discount: any;
    
    @IsString()
    @IsNotEmpty()
    readonly room_type_id: string;

    @IsNumber()
    @IsNotEmpty()
    readonly total_rooms: number;

    @IsNumber()
    @IsNotEmpty()
    readonly total_adults: number;

    @IsNumber()
    @IsNotEmpty()
    readonly total_children: number;

    @IsOptional()
    readonly room_details : any[];

    @IsOptional()
    readonly user_details : any[];

    @IsString()
    @IsNotEmpty()
    readonly total_amount: string;

    @IsString()
    @IsNotEmpty()
    readonly transaction_id: string;

    @IsString()
    @IsNotEmpty()
    readonly payment_method: string;

    @IsString()
    @IsNotEmpty()
    readonly payment_status: string;

    @IsString()
    @IsNotEmpty()
    readonly booking_status: string;

    @IsString()
    @IsNotEmpty()
    readonly checkout_url: string;
}