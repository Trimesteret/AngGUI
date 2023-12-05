import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {

  transform(value: any): { key: number, value: string }[] {
    if (value) {
      return Object.keys(value).filter(val => !isNaN(Number(val))).map(key => ({ key: Number(key), value: value[key] }));
    }
    return [];
  }

}
