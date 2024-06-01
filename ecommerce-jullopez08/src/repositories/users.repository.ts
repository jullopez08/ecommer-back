import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entidades/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.find({
      take: limit,
      skip: skip,
    });

    return await users.map(({ password, ...userNoPassword }) => userNoPassword);
  }
  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserId(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);

    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async createUser(user: Omit<User, 'id'>) {
    const newUser = this.userRepository.create(user);
    const saveUser = await this.userRepository.save(newUser);
    const { password, ...userNoPassword } = saveUser;
    return userNoPassword;
  }
  async updateUser(id: string, user: User) {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser)
      throw new NotFoundException(`User with id ${id} not found`);

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    this.userRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }
}
