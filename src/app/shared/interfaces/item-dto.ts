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
  suitableFor?: string,
  servingTemperature?: string,
  expirationDate?: Date,
  wineType?: WineType,
  liqourType?: string,
  itemType: ItemType
}
