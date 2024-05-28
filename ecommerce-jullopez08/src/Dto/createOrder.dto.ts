import { ArrayMaxSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/entidades/products.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMaxSize(1)
  products: Partial<Product>[];
}
