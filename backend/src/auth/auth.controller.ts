import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { SignInUserDto } from './dto/login.dto';
import { AuthServices } from './auth.services';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthServices) { }

    @Post('/login')
    async signIn(@Body() signInUserDto: SignInUserDto,@Query('isCustomer') isCustomer?:boolean) {
        return await this.authService.signIn(
            signInUserDto,isCustomer
        );
    }

    @Post('/register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return await this.authService.register(createUserDto);
    }

    @Post('/changePassword')
    async changePassword(@Body() requestData: { email: string, password: string, newpassword: string }) {
        return await this.authService.changePassword(requestData);
    }

    @Post('/forgotPassword')
    async forgotPassword(@Body() requestData: { email: string },@Query('isCustomer') isCustomer?: boolean ) {
      return await this.authService.forgotPassword({ email: requestData.email, isCustomer });
    }

    @Post('/getInTouch')
    async getInTouch(@Body() requestData: { fullname:string, email: string, message: string }) {        
        return await this.authService.getInTouch(requestData);
    }

    @Post('/verifyResetPasswordCode')
    async verifyResetPasswordCode(@Body() requestData: { email: string, code: string }) {        
        return await this.authService.verifyResetPasswordCode(requestData);
    }

    @Post('/resetPassword')
    async resetPassword(@Body() requestData: { email: string, password: string }) {        
        return await this.authService.resetPassword(requestData);
    }
}