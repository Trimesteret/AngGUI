import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { WineType } from '../../shared/enums/wine-type';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent implements OnInit {

  search  = '';
  typeFilter = '';
  priceSort = '';

  columnAmount = 5;

  wines: ItemDto[] = [
    {
      id: 1,
      type: WineType.RoseWine,
      price: 200,
      ean: '',
      name: 'My-wine-1',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 2,
      type: WineType.RedWine,
      price: 300,
      ean: '',
      name: 'My-wine-2',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 3,
      type: WineType.RedWine,
      price: 300,
      ean: '',
      name: 'My-wine-3',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 4,
      type: WineType.RoseWine,
      price: 300,
      ean: '',
      name: 'My-wine-4',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 5,
      type: WineType.RoseWine,
      price: 350,
      ean: '',
      name: 'My-wine-5',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 6,
      type: WineType.RoseWine,
      price: 300,
      ean: '',
      name: 'My-wine-6',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 7,
      type: WineType.WhiteWine,
      price: 100,
      ean: '',
      name: 'My-wine-7',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 8,
      type: WineType.WhiteWine,
      price: 300,
      ean: '',
      name: 'My-wine-8',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 9,
      type: WineType.WhiteWine,
      price: 300,
      ean: '',
      name: 'My-wine-9',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 10,
      type: WineType.RedWine,
      price: 300,
      ean: '',
      name: 'My-wine',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 11,
      type: WineType.RedWine,
      price: 900,
      ean: '',
      name: 'My-wine',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 12,
      type: WineType.RedWine,
      price: 300,
      ean: '',
      name: 'My-wine',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    },
    {
      id: 13,
      type: WineType.RedWine,
      price: 300,
      ean: '',
      name: 'My-wine',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    }
  ];

  displayWines: ItemDto[] = [];

  readonly breakPoints = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(distinctUntilChanged());

  constructor(private breakpointObserver: BreakpointObserver) {
    this.columnAmount = this.breakpointObserver.isMatched(Breakpoints.Handset) ? 1 : 5;

    this.displayWines = this.wines;
  }

  getWineTypeValues(): string[] {
    return Object.values(WineType);
  }


  ngOnInit(): void {
    this.breakPoints.subscribe(() =>
      this.breakpointChanged()
    );
  }


  private breakpointChanged(): void {
    if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      this.columnAmount = 1;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.columnAmount = 1;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.columnAmount = 2;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.columnAmount = 3;
    } else {
      this.columnAmount = 6;
    }
  }

  public searchChange(): void {
    this.displayWines = this.wines.filter(wine => wine.name?.toLowerCase().includes(this.search.toLowerCase()) ||
      wine.price.toString().includes(this.search.toLowerCase()));

    if (this.typeFilter) {
      this.displayWines = this.displayWines.filter(wine => wine.type === this.typeFilter);
    }

    switch (this.priceSort) {
    case 'low-to-high':
      this.displayWines = this.displayWines.sort((a, b) => a.price - b.price);
      break;
    case 'high-to-low':
      this.displayWines = this.displayWines.sort((a, b) => b.price - a.price);
      break;
    }
  }
}
