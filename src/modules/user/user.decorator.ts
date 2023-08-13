import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthInfo } from '../auth/strategies/google.strategy';

export interface UserAuthInfoRequest extends Request {
  user: UserAuthInfo;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: UserAuthInfoRequest = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
