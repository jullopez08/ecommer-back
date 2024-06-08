import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/Dto/createOrder.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  /**
   *
   * Este metodo te permite crear un nuevo pedido.
   */
  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }
  /**
   *
   * Este metodo te permite ver el pedido por su id, solo son visibles las ordenes del usuario logueado.
   */
  @Get(':id')
  getOder(@Query('id') id: string) {
    return this.ordersService.getOrders(id);
  }
}
