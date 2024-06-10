import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/Dto/createProduct.dto';
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

  createProduct(product: CreateProductDto) {
    return this.prosductsRepository.createProduct(product);
  }

  async addProducts() {
    return this.prosductsRepository.addProducts();
  }
  updateProduct(id: string, product: UpdateProductDto) {
    return this.prosductsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.prosductsRepository.deleteProduct(id);
  }
  async productcCount(): Promise<number> {
    return await this.prosductsRepository.count();
  }
}
