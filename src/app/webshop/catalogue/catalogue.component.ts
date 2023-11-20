import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Wine } from '../search/Wine';
import { WineType } from '../search/WineType';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent {

  public search = '';
  public select = '';
  public price = '';

  columnAmount = 5;

  uniqueWineTypes : WineType[] = [
    { type: 'red-0', viewType: 'Rød vin' },
    { type: 'white-1', viewType: 'Hvid vin' },
    { type: 'rose-2', viewType: 'Rosé vin' },
    { type: 'all-3', viewType: 'Alle vin' } // Type only set here because I needed the ngFor to make the option. Suboptimal.
  ];

  wines: Wine[] = [
    { name: 'æøå', price: 45, type: 'red-0', image: 'assets/PeanutNoar.jfif', id:45 },
    { name: 'Peanut Noar', type: 'red-0',price: 2364, image: 'assets/PeanutNoar.jfif', id:1 },
    { name: 'Pinot Noir', type: 'rose-2',price: 239, image: 'assets/PeanutNoar.jfif', id:4 },
    { name: 'Peanut Noar', type: 'red-0',price: 23, image: 'assets/PeanutNoar.jfif', id:5 },
    { name: 'Peanut oar', type: 'white-1',price: 23, image: 'assets/PeanutNoar.jfif', id:9 },
    { name: 'Peanut Noar', type: 'red-0',price: 23, image: 'assets/PeanutNoar.jfif', id:5 },
    { name: 'Peanut Noar', type: 'rose-2',price: 23, image: 'assets/PeanutNoar.jfif', id:76 }
  ];

  displayWines: Wine[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.columnAmount = this.breakpointObserver.isMatched(Breakpoints.Handset) ? 1 : 5;

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.columnAmount = result.matches ? 1 : 5;
    });

    this.displayWines = this.wines;
  }

  public searchChange(val: string): void {
    this.search = val;
    console.log(this.search);
    this.displayWines = this.wines.filter(wine => wine.name.toLowerCase().includes(this.search.toLowerCase()) || wine.price.toString().includes(this.search));
  }

  public selectChange(val: string): void {
    this.select = val;
    console.log(this.select);
    this.displayWines = this.select === 'all-3' ? this.wines : this.wines.filter(wine => wine.type.toString().includes(this.select));
  } // If God exists there must be a better way of doing this.

  public priceSorting(val: string): void {
    this.price = val;
    console.log(this.price);
    this.displayWines = this.price === 'low-to-high' ? this.wines.sort((a, b) => a.price - b.price) : this.wines.sort((a, b) => b.price - a.price);
  } // This appears the wrong way around because the site only updates ~every other time... I think <3
}
