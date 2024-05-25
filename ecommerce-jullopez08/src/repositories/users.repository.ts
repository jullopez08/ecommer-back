import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/users.interface';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St, Apt 4B',
      phone: '+1234567890',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securepass456',
      address: '456 Elm St, Suite 5A',
      phone: '+0987654321',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 3,
      email: 'michael.jones@example.com',
      name: 'Michael Jones',
      password: 'mypassword789',
      address: '789 Oak St',
      phone: '+1122334455',
    },
  ];
  getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const usersPaginated = this.users.slice(skip, skip + limit);

    const userSinPassword = usersPaginated.map(
      ({ password, ...userNoPassword }) => userNoPassword,
    );
    return userSinPassword;
  }
  getUserByEmail(email: string) {
    return this.users.find((users) => users.email === email);
  }

  getUserId(id: number) {
    const idUSer = this.users.find((users) => users.id === id);
    const { password, ...userNoPassword } = idUSer;
    return userNoPassword;
  }

  createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;

    this.users = [...this.users, { id, ...user }];

    return user;
  }
  updateUser(id: number, user: User) {
    const existingUser = this.getUserId(id);

    if (!existingUser) return 'User not found';

    const updatedUser = { ...existingUser, ...user };
    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((users) => users.id === id);

    if (!index) return 'User not found';

    const deleteUser = this.users[index];

    this.users = this.users.filter((users) => users.id !== id);

    const { password, ...userNoPassword } = deleteUser;
    return userNoPassword;
  }
}
