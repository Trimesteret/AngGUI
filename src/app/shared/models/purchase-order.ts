import { PurchaseOrderState } from '../enums/purchase-order-state';
import { OrderLineDto } from '../interfaces/order-line-dto';

export class PurchaseOrder {
  id?: number;
  purchaseOrderState: PurchaseOrderState = PurchaseOrderState.Open;
  orderDate: Date;
  deliveryDate?: Date;
  totalPrice = 0;
  orderLines: OrderLineDto[] = [];

  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;

  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  floor?: string;
  door?: string;
}
