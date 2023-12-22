import { IsNotEmpty, IsString, MaxLength, IsDate } from "class-validator";
export class CreateCodeDto {
    @IsString()
    @MaxLength(4)
    @IsNotEmpty()
    readonly verificationCode: string;

    @IsNotEmpty()
    readonly userId: string;
    
    @IsDate()
    @IsNotEmpty()
    readonly generationTime: Date;
}