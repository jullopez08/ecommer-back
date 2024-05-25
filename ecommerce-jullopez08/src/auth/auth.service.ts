import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'esta es el get de auth';
  }

  signIn(email: string, password: string) {
    if (!email || !password) return 'invalid credentials';

    const users = this.usersRepository.getUserByEmail(email);

    if (!users) return 'invalid credentials user';
    if (users.password === password) return 'logged in';
    return 'invalid credentials password';
  }
}
