import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entidades/users.entity';
import { UserDbService } from 'src/users/user-db.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDbServicce: UserDbService,
    private readonly jwtService: JwtService,
    // @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async signUp(user: Partial<User>) {
    const findUser = await this.userDbServicce.findByEmail(user.email);
    if (findUser) throw new BadRequestException(`user already exists`);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) throw new BadRequestException(`password not hashed`);

    const newUser = await this.userDbServicce.create({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }

  async signIn(email: string, password: string) {
    const users = await this.userDbServicce.findByEmail(email);

    if (!users) throw new BadRequestException(`invalid credentials`);

    const isPasswordValid = await bcrypt.compare(password, users.password);

    if (!isPasswordValid) throw new BadRequestException('invalid credentials');

    const payload = {
      id: users.id,
      email: users.email,
      isAdmin: users.isAdmin,
    };

    const token = this.jwtService.sign(payload);
    return { message: 'logged in', token };
  }
}
// if (!email || !password) throw new NotFoundException(`invalid credentials`);
