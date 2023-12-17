import { OrderState } from '../enums/order-state';
import { OrderLineDto } from './order-line-dto';
import { SupplierDto } from '../models/supplier-dto';
import { Address } from '../models/address';

export interface OrderDto {
  orderState: OrderState
  id?: number;
  orderDate?: Date;
  deliveryDate?: Date;
  deliveryAddress?: Address;
  totalPrice: number;
  orderLines: OrderLineDto[];
  supplier: SupplierDto;
}
