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
  getProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const usersPaginated = this.products.slice(skip, skip + limit);

    return usersPaginated;
  }

  getProductId(id: number) {
    return this.products.find((products) => products.id === id);
  }

  createProduct(product: Omit<Product, 'id'>) {
    const id = this.products.length + 1;

    this.products = [...this.products, { id, ...product }];

    return product;
  }

  updateProducts(id: number, product: Product) {
    const existinProduct = this.getProductId(id);

    if (!existinProduct) return 'Product not found';

    const updateProduct = { ...existinProduct, ...product };
    this.products = this.products.map((products) =>
      products.id === id ? updateProduct : products,
    );

    return updateProduct;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((products) => products.id === id);

    if (!index) return 'Product not found';

    const deleteProduct = this.products[index];

    this.products = this.products.filter((products) => products.id !== id);

    return deleteProduct;
  }
}
