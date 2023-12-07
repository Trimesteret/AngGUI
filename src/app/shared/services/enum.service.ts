import { Injectable } from '@angular/core';
import { CustomEnum } from '../enums/custom-enum';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EnumType } from '../enums/enum-type';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  url = environment.apiUrl + '/enum';

  constructor(private http: HttpClient) { }

  public suitableForEnums: CustomEnum[] = [];

  public getSuitableForEnums(): Observable<CustomEnum[]> {
    if(this.suitableForEnums.length > 0) {
      return of(this.suitableForEnums);
    }

    return this.http.get<CustomEnum[]>(this.url + '/' + EnumType.suitableFor)
      .pipe(tap(customEnums => this.suitableForEnums = customEnums));
  }
}
