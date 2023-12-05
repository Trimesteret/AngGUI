import { WineType } from '../enums/wine-type';
import { ItemType } from '../enums/item-type';
import { SuitableFor } from '../enums/Suitable-for';

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
  suitableFor?: SuitableFor[],
  servingTemperature?: string,
  expirationDate?: Date,
  wineType?: WineType,
  liquorType?: string,
  itemType: ItemType
}
