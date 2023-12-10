import { Injectable } from '@angular/core';
import { CustomEnum } from '../enums/custom-enum';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EnumType } from '../enums/enum-type';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  url = environment.apiUrl + '/enum';

  constructor(private http: HttpClient) { }

  /**
   * Gets the enum by id from the server.
   * @param id The id of the enum.
   */
  public getEnumById(id: number): Observable<CustomEnum> {
    return this.http.get<CustomEnum>(this.url + '/' + id);
  }

  /**
   * Creates a new enum on the server.
   * @param customEnum The enum to create.
   */
  public createEnum(customEnum: CustomEnum): Observable<CustomEnum> {
    return this.http.post<CustomEnum>(this.url, customEnum);
  }

  /**
   * Deletes an existing enum on the server.
   * @param id The id of the enum to delete.
   */
  public deleteEnum(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '/' + id);
  }

  /**
   * Edits an existing enum on the server.
   * @param customEnum The enum to update.
   */
  public editEnum(customEnum: CustomEnum): Observable<CustomEnum> {
    return this.http.put<CustomEnum>(this.url, customEnum);
  }

  /**
   * Gets the suitable for enums from the server.
   */
  public getAllCustomEnumsByType(enumType: EnumType): Observable<CustomEnum[]> {
    return this.http.get<CustomEnum[]>(this.url + '/all/' + enumType);
  }
}
