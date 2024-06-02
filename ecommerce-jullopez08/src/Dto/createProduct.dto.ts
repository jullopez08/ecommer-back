import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  imgUrl?: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
