import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) { }
   
   
    async sendTestEmail(to: string, fullName: string, verificationCode: string) {
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
}
