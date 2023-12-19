import { OrderLine } from './order-line';
import { SupplierDto } from './supplier-dto';
import { InboundOrderState } from '../enums/inbound-order-state';

export class InboundOrder {
  id?: number;
  inboundOrderState: InboundOrderState;
  orderDate?: Date;
  deliveryDate?: Date;
  orderLines: OrderLine[];
  supplierName?: string;
  supplier: SupplierDto;
}
