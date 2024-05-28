import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { OrderDetails } from './orderDetails.entity';
import { User } from './users.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order_id)
  orderDetail: OrderDetails;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
