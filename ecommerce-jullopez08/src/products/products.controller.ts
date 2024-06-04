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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateProductDto } from 'src/Dto/createProduct.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';

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
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
