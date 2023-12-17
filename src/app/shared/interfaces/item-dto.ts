import { ItemType } from '../enums/item-type';
import { CustomEnum } from '../enums/custom-enum';

export interface ItemDto {
  id?: number,
  name: string,
  ean: string,
  price: number,
  quantity: number,
  reservedQuantity: number,
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
  wineTypeEnum?: CustomEnum,
  liquorTypeEnum?: CustomEnum,
  itemType: ItemType,
}
