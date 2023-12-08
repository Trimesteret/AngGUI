import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../shared/services/items/items.service';
import { SupplierService } from '../../shared/services/suppliers/supplier.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierDto } from '../../shared/models/supplier-dto';
import { ItemType } from '../../shared/enums/item-type';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-create-edit-supplier',
  templateUrl: './create-edit-supplier.component.html',
  styleUrls: ['./create-edit-supplier.component.scss']
})
export class CreateEditSupplierComponent implements AfterViewInit{
  supplierForm: FormGroup;
  loading = true;
  associatedItems:  MatTableDataSource<ItemDto>;
  browseItems:  MatTableDataSource<ItemDto>;
  editing = false;
  public displayedColumns: string[] =  ['id', 'ean', 'name', 'price', 'itemType', 'quantity'];
  public associatedColumns: string[] =  ['id', 'ean', 'name', 'price', 'itemType', 'quantity', 'remove'];
  public searchField = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private itemService: ItemsService, private formBuilder: FormBuilder, private supplierService: SupplierService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {}

  /**
   *
   */
  public ngAfterViewInit(): void {
    this.getSupplierAndBuildForm();
  }

  public getAllItemsAndBuildTable(): void {
    this.itemService.getAllItems().subscribe(items => {
      this.browseItems = new MatTableDataSource(items);
      this.loading = false;
      this.browseItems.paginator = this.paginator;
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
      this.buildSupplierForm();
      this.editing = false;
      this.loading = false;
      return;
    }

    this.supplierService.getSupplierById(id).subscribe(supplier => {
      this.editing = true;
      this.buildSupplierForm(supplier);
      supplier?.items.forEach(item => {
        this.associatedItems.data.push(item);
        this.associatedItems._updateChangeSubscription();
      });

      this.getAllItemsAndBuildTable();
      this.loading = false;
    });
  }

  /**
   * Builds the form given an optional supplier to build the form from
   * @param supplier the optional supplier
   */
  public buildSupplierForm(supplier?: SupplierDto): void {
    this.supplierForm = this.formBuilder.group({
      name: [supplier?.name ? supplier?.name : '', Validators.required],
      items: [supplier?.items ? supplier?.items : '', Validators.required],
    });

    if(this.editing) {
      this.supplierForm.controls['name'].disable();
    }
  }

  /**
   * Remove item from list given an itemDto
   * @param removeItem the itemDto to remove
   */
  public removeItemFromTable(removeItem: ItemDto): void {
    this.associatedItems.data = this.associatedItems.data.filter(item => item.id !== removeItem.id);
  }

  /**
   * Adds an item to the table given an itemDto
   * @param addItem the item to add to the list
   */
  public addItemToTable(addItem: ItemDto): void {
    if(this.associatedItems.data.find(item => item.id === addItem.id) === null){
      this.associatedItems.data.push(addItem);
      this.associatedItems._updateChangeSubscription();
    } else {
      this.messageService.show('Vare er allerede tilknyttet');
    }
  }

  /**
   * Is run when the supplierForm is submitted and then either creates or edits the supplier
   */
  public submitSupplierForm(): void {
    const supplier = this.supplierForm?.value as SupplierDto;

    if(supplier == null){
      this.messageService.show('Fejl: Leverandør må ikke være nul');
      return;
    }

    if(this.supplierForm?.valid == false){
      this.messageService.show('Fejl: Leverandør formen indeholder fejl');
      return;
    }

    if(this.editing){
      supplier.id = parseInt(this.route.snapshot.params['id']);
      this.submitEdit(supplier);
    }

    this.submitCreate(supplier);
  }

  /**
   * The submit edit function for editing a supplier
   * @param supplier the supplierDto with the new values for supplier
   */
  public submitEdit(supplier: SupplierDto):void{
    supplier.items = this.associatedItems.data;
    this.supplierService.editSupplier(supplier).subscribe(supplier=> {
      this.messageService.show('Leverandør redigeret');
      this.buildSupplierForm(supplier);
    },
    (error) => {
      this.messageService.showError(error);
    });
  }

  /**
   * Deletes a supplier given the supplier to delete
   * @param supplier
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
   * The submit function for creating a supplier given a supplierDto
   * @param supplier the supplierDto to create
   */
  public submitCreate(supplier: SupplierDto):void{
    supplier.items = this.associatedItems.data;
    this.loading = true;
    this.supplierService.createSupplier(supplier).subscribe(supplier => {
      this.router.navigate(['/warehouse/edit-supplier/' + supplier.id]);
    }, (error) => {
      this.messageService.showError(error);
    });
  }

  /**
   * The search function for searching through tables
   * @param event
   */
  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.browseItems.filter = filterValue.trim().toLowerCase();

    if (this.browseItems.paginator) {
      this.browseItems.paginator.firstPage();
    }
  }

  /**
   * Sorts the data off the tables
   * @param event the event from the table
   */
  public sortData(event: any): void {
    const data = this.browseItems.data.slice(); // Make a copy of the data array
    if (!event.active || event.direction === '') {
      this.browseItems.data = data; // Default to unsorted data
      return;
    }

    this.browseItems.data = data.sort((a, b) => {
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
