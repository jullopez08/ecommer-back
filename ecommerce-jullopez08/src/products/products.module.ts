import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from 'src/repositories/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entidades/products.entity';
import { Categorie } from 'src/entidades/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Categorie])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
