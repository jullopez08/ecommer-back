import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly prosductsRepository: ProductsRepository) {}
  getProducts() {
    return this.prosductsRepository.getProducts();
  }
}
