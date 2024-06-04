import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserDbService } from './user-db.service';
import { PutUserDto } from 'src/Dto/putUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userBDService: UserDbService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.userBDService.getUsers(page, limit);
    }
    return this.userBDService.getUsers(page, limit);
  }

  @Get(':id')
  async getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userBDService.getUsersById(id);
    if (!user) throw new NotFoundException('User not found');

    const { password, ...userNotPassword } = user;

    return userNotPassword;
  }

  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() body: PutUserDto) {
    return this.userBDService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userBDService.deleteUser(id);
  }
}
