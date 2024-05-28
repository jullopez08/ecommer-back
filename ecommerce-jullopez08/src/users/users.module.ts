import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { UserDbService } from './user-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entidades/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserDbService],
})
export class UsersModule {}
