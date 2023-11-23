import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemType } from '../../shared/enums/item-type';
import { SortByPrice } from '../../shared/enums/sort-by-price';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent implements OnInit {

  search  = '';
  typeFilter: ItemType | undefined;
  priceSort: SortByPrice | undefined;
  itemCount= 0;

  loading = true;
  columnAmount = 5;

  displayItems: ItemDto[] = [];

  readonly breakPoints = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(distinctUntilChanged());

  constructor(private breakpointObserver: BreakpointObserver, private itemService: ItemsService) {
    this.columnAmount = this.breakpointObserver.isMatched(Breakpoints.Handset) ? 1 : 5;
    itemService.getItemsBySearch().subscribe(items => {
      this.displayItems = items;
      this.loading = false;
    });

    this.itemService.getItemCount().subscribe(itemCount => {
      this.itemCount = itemCount;
    });
  }

  getItemText(): string {
    return ` Viser ${this.displayItems.length} ud af ${this.itemCount}`;
  }

  getItemTypeValues(): string[] {
    return Object.keys(ItemType)
      .filter(key => isNaN(Number(key)));
  }

  getSortFilterValues(): string[] {
    return Object.keys(SortByPrice)
      .filter(key => isNaN(Number(key)));
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
    this.loading = true;
    this.itemService.getItemsBySearch(this.search, this.priceSort, this.typeFilter)
      .pipe(debounceTime(2000))
      .subscribe(items => {
        this.displayItems = items;
        this.loading = false;
      });
  }
}
