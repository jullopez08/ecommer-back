import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  /**
   * Esta es la propiedad name
   * @example Teclado_Gamer
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  /**
   * Esta es la propiedad description
   * @example Teclado_con_lucel_de_color_RGB
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Esta es la propiedad price
   * @example 100
   */
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  /**
   * Esta es la propiedad stock
   * @example 12
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  /**
   * Esta es la propiedad imgUrl
   * @example https://www.google.com
   */
  @ApiProperty({
    description: 'add an image url',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  @MaxLength(255)
  imgUrl: string;

  /** Esta es la propiedad category. se encuentra precargada en la tabla categories
   */

  @IsUUID()
  @IsNotEmpty()
  category: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
