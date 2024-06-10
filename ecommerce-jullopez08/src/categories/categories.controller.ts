import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createCategoriesDto } from 'src/Dto/createCategories.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async createCategoies(@Body() categories: createCategoriesDto) {
    return this.categoriesService.createCategoies(categories);
  }
}
