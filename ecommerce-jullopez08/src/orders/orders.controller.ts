import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/Dto/createOrder.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOder(@Query('id') id: string) {
    return this.ordersService.getOrders(id);
  }
}
