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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userBDService: UserDbService) {}

  /**
   * Este metodo te permite ver todos los usuarios. solo los administradores podran acceder a este endpoint
   */
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.userBDService.getUsers(page, limit);
    }
    return this.userBDService.getUsers(page, limit);
  }

  /**
   * 
   Este metodo te permite ver la informacion del usuario logueado.
   */
  @Get(':id')
  async getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userBDService.getUsersById(id);
    if (!user) throw new NotFoundException('User not found');

    const { password, isAdmin, ...userNotPassword } = user;

    return userNotPassword;
  }

  /**
   * Este metodo te permite modificar la informacion del usuario logueado.
   */
  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() body: PutUserDto) {
    return this.userBDService.updateUser(id, body);
  }

  /**
   * Este metodo te permite borrar el usuario logueado.
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userBDService.deleteUser(id);
  }
}
