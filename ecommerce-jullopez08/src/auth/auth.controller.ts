import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }
  @Post('signin')
  signIn(@Body() credencials: any) {
    const { email, password } = credencials;

    return this.authService.signIn(email, password);
  }
}
