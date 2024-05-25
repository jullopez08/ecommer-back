import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/interfaces/users.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.usersService.get(page, limit);
    }
    return this.usersService.get(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUsersById(@Param('id') id: string) {
    return this.usersService.getUsersById(Number(id));
  }

  @Post()
  createUser(@Body() body: User) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() body: User) {
    return this.usersService.updateUser(Number(id), body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
