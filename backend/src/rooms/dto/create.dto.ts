import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail, IsOptional } from "class-validator";
export class CreateRoomDto {

    @IsString()
    @IsNotEmpty()
    readonly hotel_id: string;

    @IsString()
    @IsNotEmpty()
    readonly room_type_id: string;
    
    readonly room_image: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    readonly total_rooms: number;
}