import { PurchaseOrderState } from '../enums/purchase-order-state';
import { OrderLineDto } from '../interfaces/order-line-dto';

export class PurchaseOrder {
  purchaseOrderState: PurchaseOrderState;
  id: number | null;
  orderDate: Date | null;
  deliveryDate: Date | null;
  deliveryAddress: string | null;
  totalPrice: number;
  orderLines: OrderLineDto[];

  public constructor() {
    this.purchaseOrderState = PurchaseOrderState.Open;
    this.totalPrice = 0;
    this.orderLines = [];
  }
}
