import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, Logger, ConsoleLogger } from '@nestjs/common';
import { HelpersServices } from '../services/helpers/helpers.services';

import { UsersCollection } from '../users/users.collection';
import { UsersService } from '../users/users.services';

import { CreateUserDto } from './dto/register.dto'; ``
import { SignInUserDto } from './dto/login.dto';

import { VerificationCodesService } from '../verification-codes/verificationCodes.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthServices {
  private readonly logger = new Logger(AuthServices.name);
  constructor(
    private readonly usersCollection: UsersCollection,
    private readonly usersService: UsersService,
    private readonly helper: HelpersServices,
    private readonly codeService: VerificationCodesService,
    private readonly emailService: EmailService,
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
    try {
      await this.usersCollection.createUser(createUserDto);
      const newUser = await this.usersCollection.getUserByEmail(createUserDto.email);
      const response = await this.helper.buildResponse(true, null, newUser);
      return response;
    } catch (error) {
      console.debug(`Failed to verify token: ${error}`);
      console.debug(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(await this.helper.buildResponse(false, error.message));
    }
  }

  async signIn(signInUserDto: SignInUserDto, isCustomer?: boolean): Promise<any> {
    const user = await this.usersService.getUserByPassword(signInUserDto.email);
    if (!user) {
      throw new BadRequestException(
        await this.helper.buildResponse(false, 'This email is not registered.'),
      );
    }
    if(!user.isActive || user.isDeleted){
      throw new BadRequestException(
        await this.helper.buildResponse(false, 'Your account is blocked.'),
      );
    }
    if (isCustomer && user.userType == 1) {
      throw new UnauthorizedException(
        await this.helper.buildResponse(false, 'Admin can not login as a customer'),
      );
    }
    if (!isCustomer && user.userType == 2) {
      throw new UnauthorizedException(
        await this.helper.buildResponse(false, 'You do not have admin access'),
      );
    }
    if (user.password !== signInUserDto.password) {
      throw new UnauthorizedException(
        await this.helper.buildResponse(false, 'Invalid Credentials'),
      );
    }
    try {
      const currentuser = await this.usersService.getUserByEmail(signInUserDto.email);
      const response = await this.helper.buildResponse(true, null, currentuser);
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

  async changePassword(requestData: { email: string, password: string, newpassword: string }) {
    this.logger.debug(`Request received to reset password : ${requestData.email}`);

    this.logger.debug(`Check if user registered with email ${requestData.email}`);
    const user = await this.usersCollection.getUserWithPassword(requestData.email);

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
      await this.usersCollection.changePassword(user.id, requestData.newpassword);
      return await this.helper.buildResponse(true);
    } catch (error) {
      if (error) {
        this.logger.error(JSON.stringify(error, null, 2));
        throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong.'));
      }
    }
  }

  async forgotPassword(requestData: { email: string, isCustomer?: boolean }): Promise<any> {
    this.logger.debug(`Request received to reset password: ${requestData.email}`);

    this.logger.debug(`Check if user is registered with email ${requestData.email}`);
    const user = await this.usersCollection.getUserByEmail(requestData.email);

    if (!user) {
      throw new BadRequestException(await this.helper.buildResponse(false, 'This user is not registered.'));
    }
    this.logger.debug(`User type: ${user.userType}, isCustomer: ${requestData.isCustomer?true:false}`);

    const isCustomer = requestData.isCustomer || false;

    if (isCustomer && user.userType == 1) {
      throw new UnauthorizedException(await this.helper.buildResponse(false, 'Admin cannot initiate a password reset for a customer'),
      );
    }

    if (!isCustomer && user.userType == 2) {
      throw new UnauthorizedException(await this.helper.buildResponse(false, 'Customers cannot initiate a password reset for an admin'),
      );
    }
    try {
      this.logger.debug(`Sending email to ${user.email}`);
      const verificationCode = await this.codeService.generateCode(user._id.toString());
      await this.emailService.sendVerificationCode(user.email, user.fullname, verificationCode);
      return await this.helper.buildResponse(true);
    } catch (error) {
      this.logger.error(JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(
        await this.helper.buildResponse(false, 'Something went wrong.')
      );
    }
  }

  async verifyResetPasswordCode(requestData: { email: string, code: string }) {
    this.logger.debug(`Request received to verify reset password : ${requestData.email}`);

    this.logger.debug(`Check if user registered with email ${requestData.email}`);
    const user = await this.usersCollection.getUserByEmail(requestData.email);

    if (!user)
      throw new BadRequestException(await this.helper.buildResponse(false, 'This email address is not registered.'));

    const codeDocument = await this.codeService.getCode(user._id.toString());
    const currentTime = new Date().getTime();
    const generationTime = codeDocument.generationTime.getTime();
    const diff = currentTime - generationTime
    const expTime = 5 * 60 * 1000;
    if (diff > expTime) {
      throw new BadRequestException(await this.helper.buildResponse(false, 'Verification code is expired. Please try again'));
    }
    if (codeDocument.verificationCode != requestData.code) {
      throw new UnauthorizedException(await this.helper.buildResponse(false, 'Verification code is invalid'));
    }
    const response = await this.helper.buildResponse(true);
    return response;
  }


  async resetPassword(requestData: { email: string, password: string }) {
    this.logger.debug(`Request received to reset password : ${requestData.email}`);

    this.logger.debug(`Check if user registered with email ${requestData.email}`);
    const user = await this.usersCollection.getUserByEmail(requestData.email);

    if (!user)
      throw new BadRequestException(await this.helper.buildResponse(false, 'This email address is not registered.'));

    try {
      this.logger.debug(`current password for user :  ${user._id}`);
      await this.usersCollection.changePassword(user._id, requestData.password);
      return await this.helper.buildResponse(true);
    } catch (error) {
      if (error) {
        this.logger.error(JSON.stringify(error, null, 2));
        throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong.'));
      }
    }
  }

  async getInTouch(requestData: { fullname: string, email: string, message: string }) {

    try {
      this.logger.debug(`Sending email to ${requestData.email}`);
      await this.emailService.sendEmailToAdmin(requestData.fullname, requestData.email, requestData.message);
      await this.emailService.sendEmailToUser(requestData.fullname, requestData.email);
      return await this.helper.buildResponse(true);
    } catch (error) {
      if (error) {
        this.logger.error(JSON.stringify(error, null, 2));
        throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong.'));
      }
    }
  }
}
