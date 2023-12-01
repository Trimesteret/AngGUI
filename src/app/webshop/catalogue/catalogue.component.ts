import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { WineType } from '../../shared/enums/wine-type';
import { SortByPrice } from '../../shared/enums/sort-by-price';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';
import { ItemType } from '../../shared/enums/item-type';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent implements OnInit {
  loggedIn = false;

  search  = '';
  typeFilter: ItemType | undefined;
  priceSort: SortByPrice | undefined;
  itemCount= 0;

  loading = true;
  columnAmount = 5;

  displayItems: ItemDto[] = [];
  amountOfItemsShown = 36;

  readonly breakPoints = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(distinctUntilChanged());

  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService,
              private itemService: ItemsService, private messageService: MessageService) {
    this.columnAmount = this.breakpointObserver.isMatched(Breakpoints.Handset) ? 1 : 5;

    this.loggedIn = this.authenticationService.getLoggedIn();

    itemService.getItemsBySearch(this.amountOfItemsShown).subscribe(items => {
      this.displayItems = items;
      this.loading = false;
    });

    this.itemService.getItemCount().subscribe(itemCount => {
      this.itemCount = itemCount;
    });
  }

  public getItemText(): string {
    return ` Viser ${this.displayItems.length} ud af ${this.itemCount} varer`;
  }

  public getItemTypeValues(): string[] {
    return Object.keys(ItemType).filter(key => isNaN(Number(key)));
  }

  public getSortFilterValues(): string[] {
    return Object.keys(SortByPrice)
      .filter(key => isNaN(Number(key)));
  }

  public ngOnInit(): void {
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
    this.itemService.getItemCount(this.search, this.priceSort, this.typeFilter).subscribe(itemCount => {
      this.itemCount = itemCount;
    });

    this.itemService.getItemsBySearch(this.amountOfItemsShown, this.search, this.priceSort, this.typeFilter)
      .pipe(debounceTime(2000))
      .subscribe(items => {
        this.displayItems = items;
        this.loading = false;
      });
  }

  public showMoreItems(): void {
    this.amountOfItemsShown += 36;
    this.searchChange();
  }

  public checkForMoreItems(): boolean {
    return this.amountOfItemsShown < this.itemCount;
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly SortByPrice = SortByPrice;
  protected readonly WineType = WineType;
  protected readonly ItemType = ItemType;
}
