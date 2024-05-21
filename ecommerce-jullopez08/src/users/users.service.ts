import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  get(): string {
    return 'este es Get/users';
  }
}
