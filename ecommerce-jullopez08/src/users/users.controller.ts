import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
import { PutUserDto } from 'src/Dto/putUser.dto';
import { CreateUserDto } from 'src/Dto/createUser.dto';

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
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userBDService.getUsersById(id);
  }

  @Post()
  createUser(
    @Body() body: CreateUserDto,
    @Req() request: Request & { now: string },
  ) {
    const creatUser = { ...body, createdAt: request.now };
    return this.userBDService.create(creatUser);
    // return this.usersService.createUser(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() body: PutUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
