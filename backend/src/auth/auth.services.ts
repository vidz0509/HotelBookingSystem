import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { HelpersServices } from './services/helpers/helpers.services';
// import { CreateUserDto } from '../users/dto/create/create-user.dto';

import { UsersCollection } from '../users/users.collection';
import { UsersService } from 'src/users/users.services';

// import { signIn } from './dto/login.dto';
// import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthServices {
    constructor(
        private readonly usersCollection: UsersCollection,
        private readonly usersService: UsersService,
        private readonly helper: HelpersServices,
    ) { }

    async register(
        fullname: string,
        email: string,
        password: string,
        confirmpassword: string,
      ) {
        try {
          const isUserExists = await this.usersCollection.getUserByEmail(email);
          if (isUserExists)
            throw new ConflictException(
              await this.helper.buildResponse(
                false,
                `User is already registered with this email.`,
              ),
            );
          const newUser = await this.usersCollection.createUser(
            fullname,
            email,
            password,
            confirmpassword,
          );
          // const userData = await this.helper.buildAuthResponse(newUser);
          const response = await this.helper.buildResponse(true, null);
          return response;
        } catch (error) {
          console.debug(`Failed to register user: ${error}`);
          console.debug(JSON.stringify(error, null, 2));
          throw new ConflictException('Failed to register user');
        }
      }

      async checkIfUSerExist(email: string){
        const user = await this.usersCollection.getUserByEmail(email);
        return user;
      }

    // async signIn(signIn: SignIn): Promise<any> {
    //     try {
    //         const encryptedPwd = await this.helper.encryptString(signIn.password);
    //         const user = await this.usersService.findUserByEmail(signIn.email);
    //         if (user) {
    //             if (user.password !== encryptedPwd) {
    //                 throw new UnauthorizedException();
    //             }

    //             // const updatedUser = await this.usersService.updateUserToken(user._id.toString());

    //             // const userData = await this.helper.buildAuthResponse(updatedUser);
    //             const response = await this.helper.buildResponse(true, null);
    //             return response;
    //         }
    //     } catch (error) {
    //         console.debug(`Failed to verify token: ${error}`);
    //         console.debug(JSON.stringify(error, null, 2));
    //         throw new InternalServerErrorException('Something went wrong.');
    //     }
    // }

    async registerUSer(fullname: string, email: string, password: string, confirmpassword: string) {
        // try {
            const isUserExists = await this.checkIfUserExists(email);
            if (isUserExists)
                throw new ConflictException(await this.helper.buildResponse(false, `User is already registered with this email.`));

            // const encryptedPwd = await this.helper.encryptString(request.password);
            // const createUserDto = CreateMapper.buildUser(request, encryptedPwd);

            const newUser = await this.usersCollection.createUser(fullname,email,password,confirmpassword);
            // const userData = await this.helper.buildAuthResponse(newUser);
            const response = await this.helper.buildResponse(true, null);
            return response;

        } catch (error) {
            console.debug(`Failed to register user: ${error}`);
            console.debug(JSON.stringify(error, null, 2));
            throw new InternalServerErrorException('Failed to register user');
        }

    async checkIfUserExists(email: string) {
        const users = await this.usersCollection.getUserByEmail(email);
        return users;
    }
}

    // async refreshToken(refreshTokenDto: RefreshTokenDto) {
    //     try {
    //         const encryptedToken = refreshTokenDto.refreshToken;
    //         const refreshToken = await this.helper.decryptString(encryptedToken);
    //         const [tokenTime, userId] = refreshToken.split('-');

    //         const user = await this.usersCollection.getUser(userId);
    //         if (!user)
    //             throw new UnauthorizedException(await this.helper.buildResponse(false, 'Invalid User'));

    //         if (user.token != encryptedToken){
    //             return {};
    //             // throw new UnauthorizedException(await this.helper.buildResponse(false, 'Refresh token is not valid'));
    //         }
    //         const updatedUser = await this.usersService.updateUserToken(user._id.toString());
    //         const userData = await this.helper.buildAuthResponse(updatedUser,true);
    //         const response = await this.helper.buildResponse(true, null, userData);
    //         return response;

    //     } catch (error) {
    //         console.debug(`Failed to generate refresh token.: ${error}`);
    //         console.debug(JSON.stringify(error, null, 2));
    //         throw new UnauthorizedException(await this.helper.buildResponse(false, 'Failed to generate refresh token. Please try again.'));
    //     }
    // }

// }