import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Order } from 'src/entidades/orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;

  @ApiHideProperty()
  orders: Order[];

  /**Esta es la propiedad name
   * @example Julieth
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**Esta es la propiedad email
   * @example 0zqjU@example.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**Esta es la propiedad password.
   * Debe ternar minimo 8 caracteres con mas de 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
   * @example Aa1524&&
   */
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  /**Esta es la propiedad confirmarPassword. Debe de coincidir con la password
   * @example Aa1524&&
   */
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  confirmarPassword: string;

  /**Esta es la propiedad address. puede ser vacio
   * @example calle_falsa_123
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**Esta es la propiedad phone. puede ser vacio
   * @example 3145245566
   */
  @IsOptional()
  @IsNumber()
  phone: number;

  /**Esta es la propiedad country. puede ser vacio
   * @example Mexico
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**Esta es la propiedad city. puede ser vacio
   * @example Guadalajara
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}
export class LoginUserDto extends PickType(CreateUserDto, [
  /**Esta es la propiedad email
   * @example 0zqjU@example.com
   */
  'email',

  /**Esta es la propiedad password.
   * Debe ternar minimo 8 caracteres con mas de 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
   * @example Aa1524&&
   */
  'password',
]) {}
