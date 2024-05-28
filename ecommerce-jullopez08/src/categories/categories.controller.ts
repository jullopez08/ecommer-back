import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { readFileSync } from 'fs';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  async onModuleInit() {
    await this.categoriesService.addCategories();
  }
  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }
  @Get('seeder')
  async seedCategories() {
    return await this.categoriesService.addCategories();
  }
}
