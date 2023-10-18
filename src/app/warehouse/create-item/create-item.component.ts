import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  itemForm = new FormGroup({
    wineQuantity: new FormControl(),
    wineType: new FormControl(''),
    name: new FormControl(''),
    id: new FormControl()
  });

  constructor(private http: HttpClient) {}

  submitItem(): void {
    console.log();
    const req = this.http.post<Item>('http://localhost:5169/api/item', { item: this.itemForm.value as Item } );
    req.subscribe(items => console.log(items));
  }
}
