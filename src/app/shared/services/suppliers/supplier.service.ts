import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SuppliersDTO } from '../../models/supplier-dto';
import { ItemDto } from '../../interfaces/item-dto';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  url = environment.apiUrl + '/supplier';

  constructor(private http: HttpClient) {
  }
  public getSupplierByID(id: number): Observable<SuppliersDTO> {
    return this.http.get<SuppliersDTO>(this.url + '/' + id);
  }
  public getAllSuppliers(): Observable<SuppliersDTO[]>{
    return this.http.get<SuppliersDTO[]>(this.url + '/' + 'AllSuppliers');
  }
  public createItem(supplier: SuppliersDTO):Observable<SuppliersDTO>  {
    console.log(supplier);
    return this.http.post<SuppliersDTO>(this.url, supplier);
  }

  public getAssocations(id: number): Observable<ItemDto[]>{
    return this.http.get<ItemDto[]>(this.url + '/Associated/' + id);
  }
}