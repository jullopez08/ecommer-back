import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Order } from 'src/entidades/orders.entity';

export class PutUserDto {
  @IsNotEmpty()
  id: string;
  orders: Order[];

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNumber()
  phone: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
