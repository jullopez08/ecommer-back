import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entidades/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // private users: User[] = [
  //   {
  //     id: 1,
  //     email: 'john.doe@example.com',
  //     name: 'John Doe',
  //     password: 'password123',
  //     address: '123 Main St, Apt 4B',
  //     phone: '+1234567890',
  //     country: 'USA',
  //     city: 'New York',
  //   },
  //   {
  //     id: 2,
  //     email: 'jane.smith@example.com',
  //     name: 'Jane Smith',
  //     password: 'securepass456',
  //     address: '456 Elm St, Suite 5A',
  //     phone: '+0987654321',
  //     country: 'Canada',
  //     city: 'Toronto',
  //   },
  //   {
  //     id: 3,
  //     email: 'michael.jones@example.com',
  //     name: 'Michael Jones',
  //     password: 'mypassword789',
  //     address: '789 Oak St',
  //     phone: '+1122334455',
  //   },
  // ];
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
