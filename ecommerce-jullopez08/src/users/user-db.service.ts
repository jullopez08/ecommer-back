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
  async getUsersById(id: string) {
    return await this.userDBRepository.findOneBy({ id });
  }
}
