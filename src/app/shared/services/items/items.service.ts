import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ItemDto } from '../../interfaces/item-dto';
import { SortByPrice } from '../../enums/sort-by-price';
import { ItemType } from '../../enums/item-type';
import { User } from '../../authentication/models/user';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = environment.apiUrl + '/Item';

  constructor(private http: HttpClient) {
  }

  getItemCount(search?: string, sortByPrice?: SortByPrice, itemType?: ItemType): Observable<number> {
    search = search?.trim();

    let params = new HttpParams();

    params = params.set('search', search ? search : '');
    params = params.set('sortByPrice', sortByPrice ? sortByPrice : '');
    params = params.set('itemType', itemType ? itemType : '');

    return this.http.get<number>(this.url + '/itemCount', { params: params });
  }

  getItemsBySearch(amountOfItemsShown: number, search?: string, sortByPrice?: SortByPrice, itemType?: ItemType): Observable<ItemDto[]> {
    search = search?.trim();

    let params = new HttpParams();

    params = params.set('search', search ? search : '');
    params = params.set('sortByPrice', sortByPrice ? sortByPrice : '');
    params = params.set('itemType', itemType ? itemType : '');
    params = params.set('amountOfItemsShown', amountOfItemsShown);

    return this.http.get<ItemDto[]>(this.url, { params: params });
  }

  createItem(item: ItemDto) : void {
    console.log(this.url);
    const params = new HttpParams()
      .set('id', item.id ?? '')
      .set('name', item.name)
      .set('ean', item.ean)
      .set('description', item.description ?? '')
      .set('price', item.price)
      .set('quantity', item.quantity)
      .set('year', item.year ?? '')
      .set('volume', item.volume ?? '')
      .set('alcohol', item.alcohol ?? '')
      .set('country', item.country ?? '')
      .set('grapesort', item.grapesort ?? '')
      .set('suitables', item.suitables ?? '')
      .set('imageUrl', item.imageUrl)
      .set('type', item.type ?? '');

    this.http.post(this.url + '/Item', null, { params: params });
  }
}
