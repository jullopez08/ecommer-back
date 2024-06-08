import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/entidades/products.entity';

export class CreateOrderDto {
  /**
   * Esta es la propiedad userId. Debe coincidir con el id del usuario logueado
   *
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Esta es la propiedad products. Debe de contener almenos un producto y coincider con el id de los productos
   */
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
}
