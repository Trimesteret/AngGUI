import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ItemDto } from '../../interfaces/item-dto';

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
