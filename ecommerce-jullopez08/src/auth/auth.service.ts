import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entidades/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  getAuth() {
    return 'esta es el get de auth';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) throw new NotFoundException(`invalid credentials`);

    const users = await this.usersRepository.findOne({ where: { email } });

    if (!users) throw new NotFoundException(`invalid credentials user`);
    if (users.password !== password)
      throw new NotFoundException('invalid credentials password');
    return 'logged in';
  }
}
