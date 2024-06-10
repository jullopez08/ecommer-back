import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateProductDto, UpdateProductDto } from 'src/Dto/createProduct.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Product } from 'src/entidades/products.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Los productos se cargan automaticamente al iniciar el servidor. en caso de querer cargarlos
   *manualmente, ejecutar el endpoint Products/seeder.
   * Este metodo te permite ver todos los productos.
   */
  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(page, limit);
  }

  /**
   *  Antes de usar este endpoint es necesario ejecutar el endpoint Categories/seeder. Ese metodo carga a todos los productos.
   */
  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  /**
   * 
   Este metodo te permite ver la informacion de un producto por su id.
   */
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  /**
   *
   Este metodo te permite modificar la informacion de un producto. solo los administradores podran acceder a este endpoint
   */
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  /**
   *
   * Este metodo te permite borrar un producto. solo los administradores podran acceder a este endpoint
   */
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
