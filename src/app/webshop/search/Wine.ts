import { WineType } from './WineType';

export interface Wine {
    name: string;
    price: number;
    type: string;
    country?: string;
    grapeSort?: string;
    winery?: string;
    tastingNotes?: string[];
    suitableFor?: string[];
    image: string;
    id: number;
}