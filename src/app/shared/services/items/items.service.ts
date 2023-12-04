import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ItemDto } from '../../interfaces/item-dto';
import { SortByPrice } from '../../enums/sort-by-price';
import { ItemType } from '../../enums/item-type';
import { User } from '../../authentication/models/user';
import { Item } from '../../../warehouse/create-item/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = environment.apiUrl + '/Item';

  constructor(private http: HttpClient) {
  }

  /**
   * Get item by id
   * @param id id of item
   */
  public getItemById(id: number): Observable<ItemDto> {
    return this.http.get<ItemDto>(this.url + '/' + id);
  }

  /**
   * Gets the amount of total items that matches a search
   * @param search search string
   * @param sortByPrice sort by price
   * @param itemType item type
   */
  public getItemCount(search?: string, sortByPrice?: SortByPrice, itemType?: ItemType): Observable<number> {
    search = search?.trim();

    let params = new HttpParams();

    params = params.set('search', search ? search : '');
    params = params.set('sortByPrice', sortByPrice ? sortByPrice : '');
    params = params.set('itemType', itemType ? itemType : '');

    return this.http.get<number>(this.url + '/itemCount', { params: params });
  }

  /**
   * Gets the items that matches a search
   * @param amountOfItemsShown amount of items shown
   * @param search search string
   * @param sortByPrice sort by price
   * @param itemType item type
   */
  public getItemsBySearch(amountOfItemsShown: number, search?: string, sortByPrice?: SortByPrice, itemType?: ItemType): Observable<ItemDto[]> {
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

  public editItem(item: ItemDto): Observable<ItemDto> {
    console.log(item.id);
    return this.http.put<ItemDto>(this.url, item);
  }
}

