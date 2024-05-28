import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from 'src/repositories/order.repository';
import { Order } from 'src/entidades/orders.entity';
import { OrderDetails } from 'src/entidades/orderDetails.entity';
import { User } from 'src/entidades/users.entity';
import { Product } from 'src/entidades/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
