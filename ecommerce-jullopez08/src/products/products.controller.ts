import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { Product } from 'src/interfaces/products.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Product } from 'src/entidades/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  async onModuleInit() {
    await this.productsService.addProducts();
  }

  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(page, limit);
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  // @Post()
  // @UseGuards(AuthGuard)
  // createProduct(@Body() body: Product) {
  //   return this.productsService.createProduct(body);
  // }

  // @Put(':id')
  // @UseGuards(AuthGuard)
  // updateProduct(@Param('id') id: string, @Body() body: Product) {
  //   return this.productsService.updateProduct(id, body);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
