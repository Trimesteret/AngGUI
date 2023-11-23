import { WineType } from '../enums/wine-type';

export interface ItemDto {
  id: number,
  name: string,
  ean: string,
  quantity: number,
  price: number,
  imageUrl: string,
  expirationDate?: Date,
  type?: WineType
}
