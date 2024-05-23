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
  getUsers() {
    return this.users;
  }
}
