import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { SignInUserDto } from './dto/login.dto';
// import { Request } from 'express';
import { AuthServices } from './auth.services';
// import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthServices) { }

    @Post('/login')
    async signIn(@Body() signInUserDto: SignInUserDto) {
        return await this.authService.signIn(
            signInUserDto
        );
    }

    @Post('/register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    @Post('/changePassword')
    async changePassword(@Body() requestData: { userId: string, password: string, newpassword: string }) {
        return await this.authService.changePassword(requestData);
    }

    // @Post('/forgotPassword')
    // async forgotPassword(@Body() requestData: { email: string }) {        
    //     return await this.authService.forgotPassword(requestData);
    // }
}