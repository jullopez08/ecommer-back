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

export class CreateUserDto {
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

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsOptional()
  @IsNumber()
  phone: string;

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
export class LoginUserDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
