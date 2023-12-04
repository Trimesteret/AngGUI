import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { MatTableDataSource } from '@angular/material/table';
import { ItemType } from '../../shared/enums/item-type';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})


export class EditItemComponent {
  loading = true;
  amountOfItemsShown = 36;
  search  = '';
  item: MatTableDataSource<ItemDto> = new MatTableDataSource<ItemDto>();

  public displayedColumns: string[] = ['id', 'ean', 'name', 'price', 'type', 'quantity'];
  constructor(private itemService: ItemsService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) {
    itemService.getItemsBySearch(this.amountOfItemsShown).subscribe(items => {
      this.item = new MatTableDataSource(items);
      this.loading = false;
    });
  }

  public editItem(itemId: number): void {
    this.router.navigate([`/warehouse/create-edit-items/${itemId}`]);
  }

  public createItem(): void{
    this.router.navigate(['/warehouse/create-edit-items/']);
  }

  public searchChange(): void {
    this.loading = true;
    this.itemService.getItemsBySearch(this.amountOfItemsShown, this.search)
      .subscribe(items => {
        this.item = new MatTableDataSource(items);
        this.loading = false;
      });
  }

  public logout(): void {
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly ItemType = ItemType;
}


