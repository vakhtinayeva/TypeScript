import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/models/user.entity';
import { ROLES_KEY } from '../role.decorator';

//update with array
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guardRole = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!guardRole) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.roles;
    return guardRole[0] === userRole;
  }
}
