import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Este metodo te permite ver todas las categorias.

   */
  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }
  /**
   * Las categorias se cargan automaticamente al iniciar el servidor. en caso de querer cargarlas manualmente, ejecutar el endpoint Categories/seeder.
   * Este metodo te permite ver todas las categorias.
   *
   */
  @Get('seeder')
  async seedCategories() {
    return await this.categoriesService.addCategories();
  }
}
