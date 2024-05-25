import { Injectable, Query } from '@nestjs/common';
import { User } from 'src/interfaces/users.interface';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  get(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }
  getUsersById(id: number) {
    return this.userRepository.getUserId(id);
  }
  createUser(user: Omit<User, 'id'>) {
    return this.userRepository.createUser(user);
  }
  updateUser(id: number, user: User) {
    return this.userRepository.updateUser(id, user);
  }
  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
