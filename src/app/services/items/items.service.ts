import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Item } from '../../warehouse/create-item/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = environment.apiUrl + '/Item';

  constructor(private httpClient: HttpClient) {
  }

  public getAllItems(): Observable<Item[]>{
    return this.httpClient.get<Item[]>(this.url);
  }
}
