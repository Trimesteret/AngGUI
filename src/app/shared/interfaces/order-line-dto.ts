import { ItemDto } from './item-dto';

export interface OrderLineDto {
  id?: number;
  item: ItemDto;
  itemId: number;
  linePrice?: number;
  itemPrice?: number;
  quantity: number;
}
