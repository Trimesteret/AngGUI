import { ItemDto } from '../interfaces/item-dto';

export class OrderLine {
  id?: number;
  item: ItemDto;
  itemId: number;
  linePrice: number;
  itemPrice: number;
  itemName: string;
  quantity: number;

  constructor(quantity: number, item: ItemDto) {
    this.item = item;
    this.itemId = item.id;
    this.quantity = quantity;
    this.itemName = this.item.name;
    this.itemPrice = this.item.price;
    this.linePrice = this.item.price * this.quantity;
  }
}
