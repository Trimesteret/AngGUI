import { Address } from './address';
import { OrderLine } from './order-line';
import { SupplierDto } from './supplier-dto';
import { InboundOrderState } from '../enums/inbound-order-state';

export class InboundOrder {
  id?: number;
  orderState: InboundOrderState;
  orderDate?: Date;
  deliveryDate?: Date;
  deliveryAddress: Address;
  totalPrice: number;
  orderLines: OrderLine[];
  supplier: SupplierDto;
}
