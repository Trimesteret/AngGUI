import { WineType } from '../enums/wine-type';
import { ItemType } from '../enums/item-type';

export interface ItemDto {
  id?: number,
  name: string,
  ean: string,
  price: number,
  quantity: number,
  imageUrl: string,
  description: string,
  mass: number,
  year?: number,
  volume?: number,
  alcoholPercentage?: number,
  country?: string,
  region?: string,
  grapeSort?: string,
  winery?: string,
  tastingNotes?: string,
  servingTemperature?: string,
  suitableForEnumIds?: number[],
  expirationDate?: Date,
  wineType?: WineType,
  liquorType?: string,
  itemType: ItemType,
}
