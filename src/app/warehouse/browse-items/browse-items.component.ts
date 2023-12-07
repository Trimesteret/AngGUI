import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemType } from '../../shared/enums/item-type';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-browse-items',
  templateUrl: './browse-items.component.html',
  styleUrls: ['./browse-items.component.scss']
})
export class BrowseItemsComponent implements AfterViewInit{

  loading = true;
  items: MatTableDataSource<ItemDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = ['id', 'ean', 'name', 'price', 'itemType', 'quantity'];

  constructor(private itemService: ItemsService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) {
  }

  public ngAfterViewInit(): void {
    this.itemService.getAllItems().subscribe(items => {
      this.items = new MatTableDataSource(items);
      this.loading = false;
      this.items.paginator = this.paginator;
    });
  }

  public editItem(itemId: number): void {
    this.router.navigate([`/warehouse/edit-item/${itemId}`]);
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.items.filter = filterValue.trim().toLowerCase();

    if (this.items.paginator) {
      this.items.paginator.firstPage();
    }
  }

  /**
   * Sort table data given an event
   * @param event the event
   */
  public sortData(event: any): void {
    const data = this.items.data.slice(); // Make a copy of the data array
    if (!event.active || event.direction === '') {
      this.items.data = data; // Default to unsorted data
      return;
    }

    this.items.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'ean':
          return this.compare(a.ean, b.ean, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'itemType':
          return this.compare(a.itemType, b.itemType, isAsc);
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public logout(): void {
    this.loading = true;
    this.messageService.show('Logger ud...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly ItemType = ItemType;
}
