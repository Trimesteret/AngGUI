import { PurchaseOrderState } from '../enums/purchase-order-state';
import { OrderLineDto } from '../interfaces/order-line-dto';
import { Address } from './address';

export class PurchaseOrder {
  id?: number;
  purchaseOrderState: PurchaseOrderState;
  orderDate: Date;
  deliveryDate?: Date;
  deliveryAddress: Address;
  totalPrice: number;
  orderLines: OrderLineDto[];

  public constructor() {
    this.purchaseOrderState = PurchaseOrderState.Open;
    this.totalPrice = 0;
    this.orderLines = [];
  }
}
