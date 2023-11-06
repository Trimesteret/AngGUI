import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Item } from '../../warehouse/create-item/item';
import { Observable } from 'rxjs';
import { User } from '../../authentication/models/user';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = environment.apiUrl + '/User';

  constructor(private httpClient: HttpClient) {
  }

  public getAllItems(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.url);
  }
}
