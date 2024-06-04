import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //obtener rol desde la metadata
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //validar rol
    const hasRole = () =>
      requireRoles.some((role) => user?.roles?.includes(role));

    const valid = user && user.roles && hasRole();

    if (!valid)
      throw new ForbiddenException(
        'No tienes permisos para realizar esta accion',
      );
    return valid;
  }
}
