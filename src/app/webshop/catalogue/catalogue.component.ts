import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Wine} from "../search/Wine";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent {

  public search = '';

  columnAmount = 5;

  wines: Wine[] = [
    { name: 'Peanut Noar', price: 45, image: 'assets/PeanutNoar.jfif', id:45 },
    { name: 'Peanut Noar', price: 2364, image: 'assets/PeanutNoar.jfif', id:1 },
    { name: 'Pinot Noir', price: 239, image: 'assets/PeanutNoar.jfif', id:4 },
    { name: 'Peanut Noar', price: 23, image: 'assets/PeanutNoar.jfif', id:5 },
    { name: 'Peanut oar', price: 23, image: 'assets/PeanutNoar.jfif', id:9 },
    { name: 'Peanut Noar', price: 23, image: 'assets/PeanutNoar.jfif', id:5 }
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
}
