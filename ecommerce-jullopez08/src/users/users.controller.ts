import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from 'src/interfaces/users.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserDbService } from './user-db.service';
import { User } from 'src/entidades/users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userBDService: UserDbService,
  ) {}

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
    return this.usersService.getUsersById(id);
  }

  @Post()
  createUser(@Body() body: any, @Req() request: Request & { now: string }) {
    const creatUser = { ...body, createdAt: request.now };
    return this.userBDService.create(creatUser);
    // return this.usersService.createUser(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() body: User) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
