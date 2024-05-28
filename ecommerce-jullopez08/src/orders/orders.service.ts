import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/repositories/order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrderRepository) {}

  addOrder(userId: string, products: any) {
    return this.ordersRepository.addOrder(userId, products);
  }

  getOrders(id: string) {
    return this.ordersRepository.getOrders(id);
  }
}
