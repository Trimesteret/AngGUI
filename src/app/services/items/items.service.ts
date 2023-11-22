import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ItemDto } from '../../shared/interfaces/item-dto';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = environment.apiUrl + '/item';

  constructor(private http: HttpClient) {
  }
  getWines(): Observable<ItemDto[]> {
    return this.http.get<ItemDto[]>(this.url);
  }
}
