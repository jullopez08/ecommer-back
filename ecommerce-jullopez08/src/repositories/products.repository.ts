import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorie } from 'src/entidades/categories.entity';
import { Product } from 'src/entidades/products.entity';
import * as preCarga from '../utils/pre-carga.json';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Categorie)
    private categoriesRepository: Repository<Categorie>,
  ) {}
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Smartphone X',
  //     description:
  //       'A high-end smartphone with a sleek design and powerful features.',
  //     price: 999.99,
  //     stock: true,
  //     imgUrl: 'https://example.com/smartphone_x.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Wireless Headphones',
  //     description:
  //       'Comfortable wireless headphones with noise cancellation and long battery life.',
  //     price: 199.99,
  //     stock: false,
  //     imgUrl: 'https://example.com/wireless_headphones.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Laptop Pro',
  //     description:
  //       'A lightweight laptop with a high-resolution display and fast performance.',
  //     price: 1299.99,
  //     stock: true,
  //     imgUrl: 'https://example.com/laptop_pro.jpg',
  //   },
  // ];
  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProductId(id: string) {
    const products = await this.productsRepository.findOneBy({ id });

    if (!products)
      throw new NotFoundException(`Product with id ${id} not found`);

    return products;
  }

  // async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  //   const newProduct = this.productsRepository.create(product);
  //   await this.productsRepository.save(newProduct);

  //   return newProduct;
  // }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    preCarga?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const product = new Product();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
        .execute();
    });

    return 'products added';
  }

  // async updateProduct(id: string, updateProductDto: CreateProductDto) {
  //   const product = await this.productsRepository.findOne({ where: { id } });
  //   if (!product) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }
  //   Object.assign(product, updateProductDto);
  //   return await this.productsRepository.save(product);
  // }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    this.productsRepository.remove(product);

    return product;
  }
}
