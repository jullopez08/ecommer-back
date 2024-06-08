import { Module } from '@nestjs/common';
import { AppInitializer } from './app-initializer.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  controllers: [],
  providers: [AppInitializer],
})
export class AppInitializerModule {}
