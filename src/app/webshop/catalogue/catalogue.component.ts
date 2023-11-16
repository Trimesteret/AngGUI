import { Component } from '@angular/core';

interface WineType {
  type: string;
  viewType: string;
}

interface Wine {
  name: string;
  price: number;
  image: string;
  id: number;
}
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent {
  wineType: WineType[] = [
    { type: 'red-0', viewType: 'Red' },
    { type: 'white-1', viewType: 'White' },
    { type: 'rose-2', viewType: 'Rose' },
  ];

  wines: Wine[] = [
    { name: 'Peanut Noar', price: 45, image: 'assets/PeanutNoar.jfif', id:45 },
    { name: 'Peanut Noar', price: 2364, image: 'assets/PeanutNoar.jfif', id:1 },
    { name: 'Pinot Noir', price: 239, image: 'assets/PeanutNoar.jfif', id:4 },
    { name: 'Peanut Noar', price: 23, image: 'assets/PeanutNoar.jfif', id:5 }
  ];
}
// export class CatalogueComponent {

// }


/**
 * @title Basic select
 */
