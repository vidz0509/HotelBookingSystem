import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.services';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post('/register')
    async registerUser(@Body() requestData : {name: string, age: number, hobby: string }) {
        return await this.userService.register(requestData.name, requestData.age, requestData.hobby);
    }
}

