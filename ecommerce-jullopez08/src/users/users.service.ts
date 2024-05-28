import { Injectable } from '@nestjs/common';
import { User } from 'src/entidades/users.entity';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  get(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }
  getUsersById(id: string) {
    return this.userRepository.getUserId(id);
  }
  createUser(user: Omit<User, 'id'>) {
    return this.userRepository.createUser(user);
  }
  updateUser(id: string, user: User) {
    return this.userRepository.updateUser(id, user);
  }
  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
