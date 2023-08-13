import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { UserAuthInfoRequest } from '../user/user.decorator';

@ApiTags('google')
@Controller('google')
@UseGuards(GoogleAuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('redirect')
  async googleAuthRedirect(@Req() req: UserAuthInfoRequest) {
    if (!req.user) {
      return { message: 'No user from google' };
    }
    return await this.authService.googleLogin(req.user);
  }
}
