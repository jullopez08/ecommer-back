import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorie } from 'src/entidades/categories.entity';
import { Product } from 'src/entidades/products.entity';
import * as preCarga from '../utils/pre-carga.json';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/Dto/createProduct.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Categorie)
    private categoriesRepository: Repository<Categorie>,
  ) {}
  // async createProduct(product: CreateProductDto) {
  //   const newProduct = this.productsRepository.create({
  //     name: 'algo',
  //     description: 'alo',
  //     price: 9,
  //     stock: 8,
  //     imgUrl: 'df',
  //     category: new Categorie(),
  //   });
  //   return await this.productsRepository.save(newProduct);
  // }
  async createProduct(product: CreateProductDto) {
    const {
      name,
      description,
      price,
      stock,
      imgUrl,
      category: category,
    } = product;

    const findCategories = await this.categoriesRepository.findOne({
      where: { id: category },
    });
    if (!findCategories)
      throw new Error(`Category whith Id ${category} does not exist`);

    const newProduct = this.productsRepository.create({
      name,
      description,
      price,
      stock,
      imgUrl,
      category: findCategories,
    });
    return await this.productsRepository.save(newProduct);
  }

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

  async updateProduct(id: string, upProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    Object.assign(product, upProductDto);
    return await this.productsRepository.save(product);
  }
  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    this.productsRepository.remove(product);

    return product;
  }
  async count(): Promise<number> {
    return await this.categoriesRepository.count();
  }
}
