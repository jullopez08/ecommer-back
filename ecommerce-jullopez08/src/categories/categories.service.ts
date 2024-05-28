import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  addCategories() {
    return this.categoriesRepository.addCategories();
  }
}
