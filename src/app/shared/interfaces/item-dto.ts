import { ItemType } from '../enums/item-type';

export interface ItemDto {
  id: number,
  name: string,
  ean: string,
  quantity: number,
  price: number,
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
  type?: ItemType
}
