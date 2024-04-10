import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) { }
   
   
    async sendVerificationCode(to: string, fullName: string, verificationCode: string) {
        await this.mailerService.sendMail({
            to: to,
            subject: 'Reset Password Verification',
            template: './resetPasswordCode', // `.hbs` extension is appended automatically
            context: {
                name: fullName,
                code: verificationCode,
            },
        });
    }

    async sendEmailToAdmin(fullname:string, email: string, message: string) {
        await this.mailerService.sendMail({
            to: "bhimaniyash623@gmail.com",
            subject: 'Support',
            template: './emailToAdmin', // `.hbs` extension is appended automatically
            context: {
                fullname: fullname,
                email: email,
                message: message,
            },
        });
    }

    async sendEmailToUser(fullname:string,email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Thank You For Reaching Us',
            template: './emailToUser', // `.hbs` extension is appended automatically
            context: {
                fullname: fullname,
                email: email,
            },
        });
    }

    async sendBillToUser(fullname:string,email: string, check_in: Date, check_out: Date, hotel_Name: string, hotel_Address: string, totalRooms: string, price: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Thank You For Reservation.',
            template: './BillToUser', // `.hbs` extension is appended automatically
            context: {
                fullname: fullname,
                email: email,
                checkin: check_in,
                checkout: check_out,
                hotelName: hotel_Name,
                hotelAddress: hotel_Address,
                totalRooms: totalRooms,
                totalPrice: price,
            },
        });
    }
}
