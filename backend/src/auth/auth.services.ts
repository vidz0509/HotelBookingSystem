import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { HelpersServices } from './services/helpers/helpers.services';

import { UsersCollection } from '../users/users.collection';
import { UsersService } from 'src/users/users.services';

import { CreateUserDto } from './dto/register.dto'; ``
import { SignInUserDto } from './dto/login.dto';
// import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthServices {
  private readonly logger = new Logger(AuthServices.name);
  constructor(
    private readonly usersCollection: UsersCollection,
    private readonly usersService: UsersService,
    private readonly helper: HelpersServices,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const isUserExists = await this.checkIfUserExists(createUserDto.email);
    if (isUserExists) {
      throw new ConflictException(
        await this.helper.buildResponse(false, `User is already registered with this email.`),
      );
    }
    if (! await this.helper.isValidPassword(createUserDto.password)) {
      throw new BadRequestException(
        await this.helper.buildResponse(false, `Pasword must have Min 8 chars Max 12 chars: 1 digit 1 Uppercase and 1 special char`),
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
    const user = await this.usersCollection.getUserByEmail(email);
    return user;
  }

  async changePassword(requestData: { userId: string, password: string, newpassword: string }) {
    this.logger.debug(`Request received to reset password : ${requestData.userId}`);

    this.logger.debug(`Check if user registered with email ${requestData.userId}`);
    const user = await this.usersCollection.getUserWithPassword(requestData.userId);

    if (!user)
      throw new BadRequestException(await this.helper.buildResponse(false, 'This user id is not registered.'));

      if (user.password !== requestData.password) {
      throw new UnauthorizedException(
        await this.helper.buildResponse(false, 'Current password is wrong'),
      );
    }
    if (user.password == requestData.newpassword) {
      throw new UnauthorizedException(
        await this.helper.buildResponse(false, 'Current password and new password can not be same'),
      );
    }
    try {
      await this.usersCollection.changePassword(user._id,requestData.newpassword);
      return await this.helper.buildResponse(true);
    } catch (error) {
      if (error) {
        this.logger.error(JSON.stringify(error, null, 2));
        throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong.'));
      }
    }
  }
}