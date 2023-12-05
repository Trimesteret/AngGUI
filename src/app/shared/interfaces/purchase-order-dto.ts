import { PurchaseOrderState } from '../enums/purchase-order-state';
import { OrderLineDto } from './order-line-dto';

export interface PurchaseOrderDto {
  purchaseOrderState: PurchaseOrderState
  id?: number;
  orderDate?: Date;
  deliveryDate?: Date;
  deliveryAddress: string;
  totalPrice: number;
  status: string;
  orderLines: OrderLineDto[];
  Supplier: string;
}
