// initializers/app-initializer.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';
import { resolve } from 'path';

@Injectable()
export class AppInitializer implements OnModuleInit {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  async onModuleInit() {
    await this.loadCategoriesIfNoExist();
    await this.delay(6000);
    await this.loadProductsIfNoExist();
  }
  private async loadCategoriesIfNoExist() {
    const categoriesCount = await this.categoriesService.countCategories();
    if (!categoriesCount) {
      await this.categoriesService.addCategories();
    }
  }
  private async loadProductsIfNoExist() {
    const productsCount = await this.productsService.productcCount();
    if (!productsCount) {
      await this.productsService.addProducts();
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
