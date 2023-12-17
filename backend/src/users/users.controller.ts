import { Controller, Get, Post, Req, Res, Body, Query, HttpStatus, Param, Delete, Put } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.services';
import { CreateUserDto } from '../auth/dto/register.dto';
import { SignInUserDto } from '../auth/dto/login.dto';
import { UpdateUserDto } from 'src/auth/dto/update.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post('/register')
    async registerUser(
        @Body() createUserDto: CreateUserDto) {
        return await this.userService.register(createUserDto);
    }

    @Get()
    async findAll() {
        return this.userService.getAllUsers();
    }

    @Get('/sortusers')
    async sortedUsers(@Query('order') order: string) {
        return await this.userService.sortedUsers(order);
    }

    // @Get(':name')
    // async findOne(@Param('name') name: string) {
    //     return this.userService.getUserByName(name);
    // }

    @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.getUser(id)
;
  }

    @Get(':email')
    async find(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}

