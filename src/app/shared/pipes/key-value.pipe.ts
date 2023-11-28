import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {

  transform(value: any, args?: any[]): any[] {
    if (value) {
      return Object.keys(value).filter(val => !isNaN(Number(val))).map(key => ({ key: key, value: value[key] }));
    }
    return [];
  }

}
