import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SupplierDto } from '../../models/supplier-dto';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  url = environment.apiUrl + '/supplier';

  constructor(private http: HttpClient) {}

  /**
   * Get the supplier by id
   * @param id the id to get the supplier
   */
  public getSupplierById(id: number): Observable<SupplierDto> {
    return this.http.get<SupplierDto>(this.url + '/' + id);
  }

  /**
   * Get all suppliers
   */
  public getAllSuppliers(): Observable<SupplierDto[]>{
    return this.http.get<SupplierDto[]>(this.url + '/' + 'AllSuppliers');
  }

  /**
   * Create a supplier given a supplierDto
   * @param supplier the supplierDto to create from
   */
  public createSupplier(supplier: SupplierDto):Observable<SupplierDto>  {
    return this.http.post<SupplierDto>(this.url, supplier);
  }

  /**
   * Edit a supplier given a supplierDto
   * @param supplier
   */
  public editSupplier(supplier: SupplierDto):Observable<SupplierDto>  {
    return this.http.put<SupplierDto>(this.url, supplier);
  }

  /**
   * Deletes a supplier by an id
   * @param id the id to delete the supplier by
   */
  public deleteSupplier(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '/' + id);
  }
}
