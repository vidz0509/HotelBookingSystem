import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User, UsersDocument, UserSchema } from 'src/users/users.schema';

@Injectable()
export class HelpersServices {
  async buildResponse(
    successStatus: boolean,
    errorMessage?: string,
    data?: any,
  ) {
    const response = {
      isSuccessful: successStatus,
      errorMessage: errorMessage,
      data: data,
    };
    return response;
  }

  async countResponse(
    successStatus: boolean,
    errorMessage?: string,
    count?: any,
  ) {
    const response = {
      isSuccessful: successStatus,
      errorMessage: errorMessage,
      count: count,
    };
    return response;
  }

  async isValidPassword(password) {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,15}$/; / Min 8 chars Max 12 chars: 1 digit 1 Uppercase and 1 special char /
    return regex.test(password);
  }

  async generateVerificationCode() {
    const charset = "0123456789";
    let code = '';
    for (var i = 0; i < 4; i++)
      code += charset.charAt(Math.floor(Math.random() * charset.length));
    return code;
  }

  async buildAuthResponse(userData: User) {
    const userId = userData._id.toString();
    // const expiresIn = isRefreshToken ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION_HOURS) * 3600 : parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME);
    const payload = {
      sub: userId,
      userId: userId,
      username: userData.fullname,
      email: userData.email,
      // phone: userData.phone
    };
    const response = {
      fullname: userData.fullname,
      email: userData.email,
      //   phone: userData.phone,
      // access_token: await this.generateAuthToken(payload, expiresIn),
      //   token_type: 'Bearer',
      //   expires_in: expiresIn,
      //   refresh_token: userData.token,
    };
    return response;
  }
}
