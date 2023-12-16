import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { HelpersServices } from './services/helpers/helpers.services';

import { UsersCollection } from '../users/users.collection';
import { UsersService } from 'src/users/users.services';

import { CreateUserDto } from './dto/register.dto';``
import { SignInUserDto } from './dto/login.dto';
// import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthServices {
  constructor(
    private readonly usersCollection: UsersCollection,
    private readonly usersService: UsersService,
    private readonly helper: HelpersServices,
  ) { }


  // async registerUSer(fullname: string, email: string, password: string, confirmpassword: string) {
  //   try {
  //     const isUserExists = await this.checkIfUSerExist(email);
  //     if (!isUserExists){
  //       throw new ConflictException(
  //         await this.helper.buildResponse(false, `User is already registered with this email.`),
  //       );
  //     }
  //     if (password !== confirmpassword) {
  //       throw new UnauthorizedException(
  //         await this.helper.buildResponse(false, 'Password and confirm password must be same'),
  //       );
  //     }
  //     // const encryptedPwd = await this.helper.encryptString(request.password);
  //     // const createUserDto = CreateMapper.buildUser(request, encryptedPwd);

  //     const newUser = await this.usersCollection.createUser(fullname, email, password, confirmpassword);
  //     // const userData = await this.helper.buildAuthResponse(newUser);
  //     const response = await this.helper.buildResponse(true, null, newUser);
  //     return response;
  //   } catch (error) {
  //     console.debug(`Failed to register user: ${error}`);
  //     console.debug(JSON.stringify(error, null, 2));
  //     throw new InternalServerErrorException('Failed to register user');
  //   }
  // }

  async register(createUserDto: CreateUserDto) {
    const isUserExists = await this.checkIfUserExists(createUserDto.email);
    if (isUserExists) {
      throw new ConflictException(
        await this.helper.buildResponse(false, `User is already registered with this email.`),
      );
    }
    // if (password !== confirmpassword) {
    //   throw new UnauthorizedException(
    //     await this.helper.buildResponse(false, 'Password and confirm password must be same'),
    //   );
    // }
    try {
      const newUser = await this.usersCollection.createUser(createUserDto);
      const response = await this.helper.buildResponse(true, null, newUser);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }


  async signIn(signInUserDto: SignInUserDto): Promise<any> {
    const user = await this.usersService.getUserByEmail(signInUserDto.email);
    if (!user) {
      throw new BadRequestException(
        await this.helper.buildResponse(false, 'This email is not registered.'),
      );
    }
    if (user.password !== signInUserDto.password) {
      throw new UnauthorizedException(
        await this.helper.buildResponse(false, 'Invalid Credentials'),
      );
    }
    try {
      const response = await this.helper.buildResponse(true, null, user);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException('Something went wrong.');
    }
  }
  async checkIfUserExists(email: string) {
    const user = await this.usersCollection.getUserByEmail(email)
      ;
    return user;
  }
}