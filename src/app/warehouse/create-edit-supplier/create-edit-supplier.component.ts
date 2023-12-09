import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ItemsService } from '../../shared/services/items/items.service';
import { SupplierService } from '../../shared/services/suppliers/supplier.service';
import { MessageService } from '../../shared/services/message.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierDto } from '../../shared/models/supplier-dto';
import { ItemType } from '../../shared/enums/item-type';
import { ItemDto } from '../../shared/interfaces/item-dto';

@Component({
  selector: 'app-create-edit-supplier',
  templateUrl: './create-edit-supplier.component.html',
  styleUrls: ['./create-edit-supplier.component.scss']
})
export class CreateEditSupplierComponent implements AfterViewInit{
  loading = true;
  associatedItems:  MatTableDataSource<ItemDto>;
  filteredItems: ItemDto[];
  allItems: ItemDto[];
  search = '';
  supplierName: string;
  editing = false;
  associatedColumns: string[] =  ['id', 'ean', 'name', 'price', 'itemType', 'quantity', 'remove'];

  constructor(private itemService: ItemsService, private supplierService: SupplierService, private messageService: MessageService,
              private router: Router, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) {}

  /**
   *
   */
  public ngAfterViewInit(): void {
    this.getSupplierAndBuildForm();
  }

  /**
   * Gets all items and builds the table
   */
  public getAllItemsAndBuildTable(): void {
    this.itemService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.loading = false;
    });
  }

  /**
   * Gets the item and builds the form
   */
  public getSupplierAndBuildForm(): void {
    let id = null;
    this.loading = true;
    const idString = this.route.snapshot.params['id'];

    id = parseInt(idString);

    if(!Number.isInteger(id)) {
      this.editing = false;
      this.loading = false;
      return;
    }

    this.supplierService.getSupplierById(id).subscribe(supplier => {
      this.editing = true;
      this.associatedItems = new MatTableDataSource(supplier.items);
      this.supplierName = supplier.name;
      this.getAllItemsAndBuildTable();
      this.loading = false;
    });
  }

  /**
   * Remove item from list given an itemDto
   * @param removeItem the itemDto to remove
   */
  public removeItemFromTable(removeItem: ItemDto): void {
    this.associatedItems.data = this.associatedItems.data.filter(item => item.id !== removeItem.id);
  }

  /**
   * The submit edit function for editing a supplier
   */
  public editSupplier():void{
    const idString = this.route.snapshot.params['id'];

    const id = parseInt(idString);
    if(this.supplierName == '' || this.supplierName == null){
      this.messageService.show('Fejl: Leverandør har intet navn');
      return;
    }

    const supplier: SupplierDto = { id: id, name: this.supplierName, items: this.associatedItems.data };
    this.supplierService.editSupplier(supplier).subscribe(supplier=> {
      this.messageService.show('Leverandør redigeret');
      this.supplierName = supplier.name;
      this.associatedItems.data = supplier.items;
    },
    (error) => {
      this.messageService.showError(error);
    });
  }

  /**
   * Deletes a supplier
   */
  public submitDelete():void{
    const id = this.route.snapshot.params['id'];

    this.loading = true;
    this.supplierService.deleteSupplier(id).subscribe(res=> {
      if(res){
        this.messageService.show('Leverandør slettet');
        this.loading = false;
        return this.router.navigate(['/warehouse/browse-suppliers']);
      }

      this.loading=false;
      return this.messageService.show('Fejl: Slet af Leverandør fejlede');
    },
    (error) => {
      this.messageService.showError(error);
    });
  }

  /**
   * Adds an item to the table given an itemDto
   * @param event the event from the mat select
   */
  public addItemToAssociatedItems(event: any): void {
    const itemId = event.option.value.id;
    const associatedItem = this.associatedItems.data.find(assItem => assItem.id === itemId);
    if(!associatedItem){
      this.associatedItems.data.push(this.allItems.find(item => item.id === itemId));
      this.associatedItems.data = this.associatedItems.data;
      this.messageService.show('Vare tilknyttet til leverandør');
      this.search = '';
    } else {
      this.messageService.show('Vare er allerede tilknyttet');
      this.search = '';
    }
    this.search = '';
  }

  /**
   * The submit function for creating a supplier given a supplierDto
   */
  public createSupplier(): void{
    if(this.supplierName == '' || this.supplierName == null){
      this.messageService.show('Fejl: Leverandør har intet navn');
      return;
    }

    const supplier: SupplierDto = { 'name': this.supplierName };
    this.loading = true;
    this.supplierService.createSupplier(supplier).subscribe(supplier => {
      this.messageService.show('Leverandør oprettet');
      this.router.navigate(['/warehouse/edit-supplier/' + supplier.id]);
    }, (error) => {
      this.messageService.showError(error);
    });
  }

  /**
   * The search function for searching through all items
   */
  public applySearch(): void {
    this.filteredItems = this.allItems.filter(item =>
      item.name.toLowerCase().includes(this.search) || item.ean.toLowerCase().includes(this.search)
      || item.id.toString().includes(this.search) || ItemType[item.itemType].toString().includes(this.search)
    );
  }

  /**
   * Sorts the data off the tables
   * @param event the event from the table
   */
  public sortData(event: any): void {
    const data = this.associatedItems.data.slice(); // Make a copy of the data array
    if (!event.active || event.direction === '') {
      this.associatedItems.data = data; // Default to unsorted data
      return;
    }

    this.associatedItems.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'item':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  protected readonly ItemType = ItemType;
}
