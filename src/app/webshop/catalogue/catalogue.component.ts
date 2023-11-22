import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { WineType } from '../../shared/enums/wine-type';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../../services/items/items.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent implements OnInit {

  search  = '';
  typeFilter = '';
  priceSort = '';

  loading = true;
  columnAmount = 5;

  wines: ItemDto[] = [];

  displayWines: ItemDto[] = [];

  readonly breakPoints = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(distinctUntilChanged());

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private itemService: ItemsService) {
    this.columnAmount = this.breakpointObserver.isMatched(Breakpoints.Handset) ? 1 : 5;
    itemService.getWines().subscribe(items => {
      this.wines = items;
      this.loading = false;
      this.searchChange();
    });
  }

  getWineTypeValues(): string[] {
    return Object.values(WineType);
  }


  ngOnInit(): void {
    this.breakPoints.subscribe(() =>
      this.breakpointChanged()
    );

    this.displayWines = this.wines;
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
      console.log(this.wines);
    }

    switch (this.priceSort) {
    case 'low-to-high':
      this.displayWines = this.displayWines.sort((a, b) => a.price - b.price);
      console.log(this.wines);
      break;
    case 'high-to-low':
      this.displayWines = this.displayWines.sort((a, b) => b.price - a.price);
      console.log(this.wines);
      break;
    }
  }
}
