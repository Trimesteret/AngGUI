import { ItemRelationDto } from '../interfaces/item-relation-dto';

export interface SuppliersDTO {
  id?:number,
  name: string
  items?: ItemRelationDto[];
}
