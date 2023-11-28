import { WineType } from '../enums/wine-type';
import { ItemType } from '../enums/item-type';

export interface ItemDto {
  id?: number,
  name: string,
  ean: string,
  description?: string,
  price: number,
  quantity: number,
  year?: number,
  volume?: number,
  alcohol?: number,
  country?: string,
  grapesort?: string,
  suitables?: string,
  imageUrl: string,
  expirationDate?: Date,
  wineType?: WineType,
  itemType: ItemType
}
