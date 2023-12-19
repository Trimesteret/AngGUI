import { Component, ViewChild } from '@angular/core';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemType } from '../../shared/enums/item-type';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../../shared/models/table-column';
import { MatPaginator } from '@angular/material/paginator';
import { TableColumnType } from '../../shared/enums/table-column-type';
import { InboundOrderState } from '../../shared/enums/inbound-order-state';

@Component({
  selector: 'app-browse-items',
  templateUrl: './browse-items.component.html',
  styleUrls: ['./browse-items.component.scss']
})
export class BrowseItemsComponent{
  items: MatTableDataSource<ItemDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: TableColumn[] = [
    { key: 'id', value: 'Id' }, { key: 'ean', value: 'EAN' }, { key: 'name', value: 'Navn' }, { key: 'price', value: 'Pris' },
    { key: 'itemType', value: 'Varetype', type: TableColumnType.enum, enum: ItemType }, { key: 'quantity', value: 'Antal' }
  ];

  constructor(private itemService: ItemsService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) {
    this.itemService.getAllItems().subscribe(items => {
      this.items = new MatTableDataSource<ItemDto>(items);
      this.items.paginator = this.paginator;
    });
  }

  public editItem(itemId: number): void {
    this.router.navigate([`/warehouse/edit-item/${itemId}`]);
  }

  protected readonly ItemType = ItemType;
}
