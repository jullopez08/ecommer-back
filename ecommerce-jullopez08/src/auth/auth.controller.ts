import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/Dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credencials: LoginUserDto) {
    const { email, password } = credencials;

    return this.authService.signIn(email, password);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    if (user.password !== user.confirmarPassword)
      throw new BadRequestException('Passwords do not match');
    const newUser = await this.authService.signUp(user);
    const { password, confirmarPassword, ...userNotPassword } = newUser;

    return userNotPassword;
  }
}
