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
    await this.categoriesService.addCategories();
    await this.delay(5000);
    await this.productsService.addProducts();
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
