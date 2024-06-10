import { Injectable } from '@nestjs/common';
import { Categorie } from 'src/entidades/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as preCarga from '../utils/pre-carga.json';
import { Repository } from 'typeorm';
import { createCategoriesDto } from 'src/Dto/createCategories.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categorie)
    private categoriesRepository: Repository<Categorie>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async createCategories(categories: createCategoriesDto) {
    const newCategories = this.categoriesRepository.create(categories);
    return await this.categoriesRepository.save(newCategories);
  }

  async addCategories() {
    preCarga?.map(async (element) => {
      await this.categoriesRepository

        .createQueryBuilder()
        .insert()
        .into(Categorie)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    });
    return 'categories added';
  }
  async count(): Promise<number> {
    return await this.categoriesRepository.count();
  }
}
