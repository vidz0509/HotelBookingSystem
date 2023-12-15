import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, Res, HttpStatus } from '@nestjs/common';
// import { CreateUserDto } from '../users/dto/create/create-user.dto';
// import { SignInUserDto } from './dto/login.dto';
// import { Request } from 'express';
import { AuthServices } from './auth.services';
// import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthServices) { }

    @Get('/login')
    async signIn(@Body() requestData: { email: string, password: string }) {
        return await this.authService.signIn(requestData.email, requestData.password);
    }

    @Post('/authregister')
    async registerUser(@Body() requestData: { fullname: string, email: string, password: string, confirmpassword: string }) {
        return await this.authService.registerUSer(requestData.fullname, requestData.email, requestData.password, requestData.confirmpassword);
    }
}
// @Post('/refreshToken')
// async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
//     return await this.authService.refreshToken(refreshTokenDto);
// }