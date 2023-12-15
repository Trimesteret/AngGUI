import { PurchaseOrderState } from '../enums/purchase-order-state';
import { OrderLineDto } from '../interfaces/order-line-dto';
import { Address } from './address';
import { UserStandardDto } from './user-standard-dto';

export class PurchaseOrder {
  id?: number;
  orderCustomer: UserStandardDto;
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
