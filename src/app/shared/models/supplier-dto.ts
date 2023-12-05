import { ItemDto } from '../interfaces/item-dto';

export interface SuppliersDTO {
  id:number,
  name: string
  items?: ItemDto[];
}
