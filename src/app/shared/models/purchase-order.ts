import { PurchaseOrderState } from '../enums/purchase-order-state';
import { OrderLineDto } from '../interfaces/order-line-dto';
import { Address } from './address';
import { User } from './user';

export class PurchaseOrder {
  id?: number;
  user: User;
  purchaseOrderState: PurchaseOrderState;
  orderDate: Date;
  deliveryDate?: Date;
  address: Address;
  totalPrice: number;
  orderLines: OrderLineDto[];

  public constructor() {
    this.purchaseOrderState = PurchaseOrderState.Open;
    this.totalPrice = 0;
    this.orderLines = [];
  }
}
