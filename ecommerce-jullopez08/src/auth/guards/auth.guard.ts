import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from '../role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');
    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.JwtService.verify(token, { secret });

      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);
      // dar permisos de administrador
      payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User];

      console.log(payload, 'payload');

      request.user = payload;
      console.log(request.user);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
