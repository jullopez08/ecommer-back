import { Injectable } from '@nestjs/common';
import { Product } from 'src/entidades/products.entity';
// import { Product } from 'src/interfaces/products.interface';
import { ProductsRepository } from 'src/repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly prosductsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.prosductsRepository.getProducts(page, limit);
  }

  getProductById(id: string) {
    return this.prosductsRepository.getProductId(id);
  }

  // createProduct(product: Omit<Product, 'id'>) {
  //   return this.prosductsRepository.createProduct(product);
  // }

  async addProducts() {
    return this.prosductsRepository.addProducts();
  }
  // updateProduct(id: string, product: Product) {
  //   return this.prosductsRepository.updateProduct(id, product);
  // }

  deleteProduct(id: string) {
    return this.prosductsRepository.deleteProduct(id);
  }
}
