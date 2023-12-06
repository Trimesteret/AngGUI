import { OrderState } from '../enums/order-state';
import { OrderLineDto } from './order-line-dto';

export interface OrderDto {
  orderState: OrderState
  id?: number;
  orderDate?: string;
  deliveryDate?: string;
  deliveryAddress: string;
  totalPrice: number;
  status: string;
  orderLines: OrderLineDto[];
  supplier: string;
}
