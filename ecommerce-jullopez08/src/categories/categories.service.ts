import { Injectable } from '@nestjs/common';
import { createCategoriesDto } from 'src/Dto/createCategories.dto';
import { CategoriesRepository } from 'src/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  createCategoies(categories: createCategoriesDto) {
    return this.categoriesRepository.createCategories(categories);
  }

  addCategories() {
    return this.categoriesRepository.addCategories();
  }
  async countCategories(): Promise<number> {
    return await this.categoriesRepository.count();
  }
}
