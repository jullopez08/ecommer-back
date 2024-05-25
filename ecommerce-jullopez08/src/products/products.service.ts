import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/products.interface';
import { ProductsRepository } from 'src/repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly prosductsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.prosductsRepository.getProducts(page, limit);
  }

  getProductById(id: number) {
    return this.prosductsRepository.getProductId(id);
  }

  createProduct(product: Omit<Product, 'id'>) {
    return this.prosductsRepository.createProduct(product);
  }

  updateProduct(id: number, product: Product) {
    return this.prosductsRepository.updateProducts(id, product);
  }

  deleteProduct(id: number) {
    return this.prosductsRepository.deleteProduct(id);
  }
}
