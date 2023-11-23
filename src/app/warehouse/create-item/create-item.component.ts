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
  selected = 'something';
  wineType = 'something';
  suitables = new FormControl('');
  suitablesList: string[] = ['Dessert', 'Fisk', 'Havregrød'];


  itemForm = new FormGroup({
    itemName: new FormControl(''),
    itemDescription: new FormControl(''),
    itemPrice: new FormControl(),
    itemQuantity: new FormControl(),
    yearField: new FormControl(),
    volumeField: new FormControl(),
    alcoholPercentageField: new FormControl(),
    countryField: new FormControl(),
    grapesortField: new FormControl(),
    suitables: new FormControl(),
    wineType: new FormControl()
  });
  constructor(private http: HttpClient) {}
  fileName = '';

  // eslint-disable-next-line @typescript-eslint/typedef
  // onFileSelected(event):void{
  //
  //   const file:File = event.target.files[0];
  //
  //   if (file) {
  //     this.fileName = file.name;
  //     const formData = new FormData();
  //     formData.append('thumbnail', file);
  //     const upload$ = this.http.post('/api/thumbnail-upload', formData);
  //     upload$.subscribe();
  //   }
  // }



  submitItem(): void {
    const req = this.http.post<Item>('http://localhost:5169/api/item', { item: this.itemForm.value as Item } );
    req.subscribe(items => console.log(items));
  }
}
