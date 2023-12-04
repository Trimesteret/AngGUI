import { ItemDto } from '../interfaces/item-dto';

export class OrderLine {
  id: number | null;
  productId: number;
  quantity: number;
  price: number;
  item: ItemDto;
  purchaseOrderId?: number;

  constructor(productId: number, quantity: number, price: number, item: ItemDto) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.item = item;
  }

}
