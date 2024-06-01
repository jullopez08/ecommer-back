import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entidades/orderDetails.entity';
import { Order } from 'src/entidades/orders.entity';
import { Product } from 'src/entidades/products.entity';
import { User } from 'src/entidades/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async addOrder(userId: string, products: any[]) {
    let total = 0;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const order = new Order();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.orderRepository.save(order);

    const productsArr = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });
        if (!products || !products.length) {
          throw new NotFoundException('No products provided');
        }
        if (!product) {
          throw new NotFoundException({
            product: null,
            error: `Product ${element.id} not found`,
          });
        }

        if (product.stock < 1) {
          throw new NotFoundException({
            product: null,
            error: `There is not enough stock of ${product.name}`,
          });
        }

        total += Number(product.price);
        return { product, error: null };
      }),
    );

    const validProduct = productsArr.filter((p) => p.product !== null);
    const errors = productsArr
      .filter((p) => p.product === null)
      .map((p) => p.error);

    if (validProduct.length === 0) {
      throw new NotFoundException(
        `No valid products to create the order. Errors: ${errors.join(', ')}`,
      );
    }

    await Promise.all(
      validProduct.map(async ({ product }) => {
        await this.productRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );
      }),
    );

    const orderDetails = new OrderDetails();
    orderDetails.price = Number(Number(total).toFixed(2));
    orderDetails.products = validProduct.map((p) => p.product);
    orderDetails.order_id = newOrder;

    await this.orderDetailsRepository.save(orderDetails);

    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetail: true,
      },
    });
  }

  async getOrders(id: string) {
    const order = this.orderRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return order;
  }
}
