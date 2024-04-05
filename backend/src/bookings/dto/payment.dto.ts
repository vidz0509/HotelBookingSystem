import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional, isDate, IsDate } from "class-validator";
export class PaymentDto {

    @IsNotEmpty()
    readonly check_in: Date;

    @IsNotEmpty()
    readonly check_out: Date;

    @IsString()
    @IsNotEmpty()
    readonly user_id: string;
    
    @IsOptional()
    readonly discount: number;

    @IsString()
    @IsNotEmpty()
    readonly hotelId: string;

    @IsOptional()
    readonly roomList: any[];

    @IsOptional()
    readonly finalSelectedRooms: any;

    @IsOptional()
    readonly user_detail: any[];
}