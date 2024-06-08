import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/Dto/createUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   *Por medio de este endpoint se logueara el usuario que esta previamente registrado. como resultado devolvera un token que tiene la duracion de 1 hora, con el que podra hacer las peticiones en las que tenga acceso.
   */
  @Post('signin')
  signIn(@Body() credencials: LoginUserDto) {
    const { email, password } = credencials;

    return this.authService.signIn(email, password);
  }

  /**
   *Por medio de este endpoint se creara un nuevo usuario
   *
   */
  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    if (user.password !== user.confirmarPassword)
      throw new BadRequestException('Passwords do not match');
    const newUser = await this.authService.signUp(user);
    const { password, confirmarPassword, isAdmin, ...userNotPassword } =
      newUser;

    return userNotPassword;
  }
}
