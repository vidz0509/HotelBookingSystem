import { Controller, Get, Post, Req, Res, Body, Query, HttpStatus, Param, Delete, Put } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.services';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post('/register')
    async registerUser(@Body() requestData: { FullName: string, Email: string, Password: string, ConfirmPassword: string }) {
        return await this.userService.register(requestData.FullName, requestData.Email, requestData.Password, requestData.ConfirmPassword);
    }

    @Get()
    async findAll() {
        return this.userService.getAllUsers();
    }

    @Get('/sortusers')
    async sortedUsers(@Query('order') order: string) {
        return await this.userService.sortedUsers(order);
    }

    @Get(':name')
    async findOne(@Param('name') name: string) {
        return this.userService.getUserByName(name);
    }

    @Get(':email')
    async find(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string,
        @Body() requestData: { name: string, age: number, hobby: string }) {
        return this.userService.updateUser(id, requestData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}

