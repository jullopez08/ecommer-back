import { ApiHideProperty } from '@nestjs/swagger';
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
  @ApiHideProperty()
  @IsNotEmpty()
  id: string;

  @ApiHideProperty()
  @IsNotEmpty()
  orders: Order[];

  /**
   * Esta es la propiedad name
   * @example Julieth
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiHideProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**Esta es la propiedad password.
   * Debe ternar minimo 8 caracteres con mas de 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
   * @example Aa1524&&
   */
  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  /**Esta es la propiedad address
   * @example Cll_12#
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Esta es la propiedad phone
   * @example 312456789
   */
  @IsOptional()
  @IsNumber()
  phone: number;

  /**
   * Esta es la propiedad country
   * @example Mexico
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * Esta es la propiedad city
   * @example Guadalajara
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
