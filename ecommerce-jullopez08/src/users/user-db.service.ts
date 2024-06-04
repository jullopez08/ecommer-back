import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entidades/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDbService {
  constructor(
    @InjectRepository(User) private userDBRepository: Repository<User>,
  ) {}

  async create(user: any) {
    return await this.userDBRepository.save(user);
  }
  async getUsers(page: number, limit: number) {
    const DBUsers = await this.userDBRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    return DBUsers;
  }
  async getUsersById(id: string) {
    return await this.userDBRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userDBRepository.findOneBy({ email: email });
  }
  async updateUser(id: string, user: any) {
    return await this.userDBRepository.update({ id }, user);
  }
  async deleteUser(id: string) {
    return await this.userDBRepository.delete({ id });
  }
}
