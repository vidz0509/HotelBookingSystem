import { Controller, Get, Post, Req, Res, Body, HttpStatus, Param, Delete, Put, Query, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.services';
import { CreateUserDto } from '../auth/dto/register.dto';
import { SignInUserDto } from '../auth/dto/login.dto';
import { UpdateUserDto } from 'src/auth/dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';


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

    @Get('/count')
    async getUsersCount(): Promise<number> {
        return this.userService.getUsersCount();
    }

    @Get('/sortusers')
    async sortedUsers(@Query('order') order: string) {
        return await this.userService.sortedUsers(order);
    }

    // @Get(':name')
    // async findOne(@Param('name') name: string) {
    //     return this.userService.getUserByName(name);
    // }
    @Get('/getByEmail')
    async find(@Query('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userService.getUser(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Put('/updatestatus/:id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: number) {
        return this.userService.updateStatus(id, status);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') userId: string) {
        return this.userService.uploadProfile(userId, file);
    }

    @Get('uploads/userProfiles/:filename')
    async serveFile(@Param('filename') filname: string, @Res() res: Response) {
        return res.sendFile(filname, { root: 'uploads/userProfiles' });
    }
}

