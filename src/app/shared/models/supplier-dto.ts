import { ItemDto } from '../interfaces/item-dto';

export interface SupplierDto {
  id?: number,
  name: string
  items?: ItemDto[];
}
