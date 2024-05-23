import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/products.interface';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone X',
      description:
        'A high-end smartphone with a sleek design and powerful features.',
      price: 999.99,
      stock: true,
      imgUrl: 'https://example.com/smartphone_x.jpg',
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      description:
        'Comfortable wireless headphones with noise cancellation and long battery life.',
      price: 199.99,
      stock: false,
      imgUrl: 'https://example.com/wireless_headphones.jpg',
    },
    {
      id: 3,
      name: 'Laptop Pro',
      description:
        'A lightweight laptop with a high-resolution display and fast performance.',
      price: 1299.99,
      stock: true,
      imgUrl: 'https://example.com/laptop_pro.jpg',
    },
  ];
  getProducts() {
    return this.products;
  }
}
