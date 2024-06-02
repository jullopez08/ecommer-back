import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Order } from 'src/entidades/orders.entity';

export class CreateUserDto {
  id: string;
  orders: Order[];

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  confirmarPassword: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsOptional()
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
