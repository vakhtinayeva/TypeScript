import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserAuthInfo } from './strategies/google.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(user: UserAuthInfo) {
    const existingUser = await this.userService.getUserByEmail(user.email);
    if (existingUser) {
      const payload = {
        sub: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return 'Unauthorized';
  }
}
