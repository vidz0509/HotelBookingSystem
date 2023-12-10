import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
// import { CreateUserDto } from '../users/dto/create/create-user.dto';
// import { SignInUserDto } from './dto/login.dto';
import { AuthServices } from './auth.services';
// import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthServices) { }

    // @Post('/login')
    // async signIn(@Body() signInUserDto: SignInUserDto) {
    //     return await this.authService.signIn(signInUserDto);
    // }

    @Post('/authregister')
    async registerUser(@Body() requestData: {FullName: string, Email: string, Password: string, ConfirmPassword: string}) {
        return await this.authService.register(requestData.FullName, requestData.Email, requestData.Password, requestData.ConfirmPassword);
    }

    // @Post('/refreshToken')
    // async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    //     return await this.authService.refreshToken(refreshTokenDto);
    // }
}