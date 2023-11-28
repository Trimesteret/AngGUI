import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ItemDto } from '../../interfaces/item-dto';
import { SortByPrice } from '../../enums/sort-by-price';
import { WineType } from '../../enums/wine-type';
import { User } from '../../authentication/models/user';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = environment.apiUrl + '/Item';

  constructor(private http: HttpClient) {
  }



  getItemCount(search?: string, sortByPrice?: SortByPrice, itemType?: WineType): Observable<number> {
    search = search?.trim();

    let params = new HttpParams();

    params = params.set('search', search ? search : '');
    params = params.set('sortByPrice', sortByPrice ? sortByPrice : '');
    params = params.set('itemType', itemType ? itemType : '');

    return this.http.get<number>(this.url + '/itemCount', { params: params });
  }

  getItemsBySearch(amountOfItemsShown: number, search?: string, sortByPrice?: SortByPrice, itemType?: WineType): Observable<ItemDto[]> {
    search = search?.trim();

    let params = new HttpParams();

    params = params.set('search', search ? search : '');
    params = params.set('sortByPrice', sortByPrice ? sortByPrice : '');
    params = params.set('itemType', itemType ? itemType : '');
    params = params.set('amountOfItemsShown', amountOfItemsShown);

    return this.http.get<ItemDto[]>(this.url, { params: params });
  }

  public createItem(item: ItemDto):Observable<boolean>  {
    return this.http.post<boolean>(this.url, item);
  }
}

