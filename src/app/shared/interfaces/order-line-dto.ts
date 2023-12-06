import { ItemDto } from './item-dto';

export interface OrderLineDto {
  id: number | null;
  productId: number;
  quantity: number;
  price: number;
  item: ItemDto;
  purchaseOrderId?: number;
}
