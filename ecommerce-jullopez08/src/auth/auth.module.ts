import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entidades/users.entity';
import { UserDbService } from 'src/users/user-db.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, UserDbService],
})
export class AuthModule {}
