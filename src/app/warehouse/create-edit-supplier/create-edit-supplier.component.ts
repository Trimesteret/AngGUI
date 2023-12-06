import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../shared/services/items/items.service';
import { SupplierService } from '../../shared/services/suppliers/supplier.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersDTO } from '../../shared/models/supplier-dto';
import { ItemType } from '../../shared/enums/item-type';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-edit-supplier',
  templateUrl: './create-edit-supplier.component.html',
  styleUrls: ['./create-edit-supplier.component.scss']
})
export class CreateEditSupplierComponent implements AfterViewInit{
  supplierForm: FormGroup | undefined;
  loading = true;
  associatedItems:  MatTableDataSource<ItemDto>;
  browseItems:  MatTableDataSource<ItemDto>;
  editingSupplier = false;
  public displayedColumns: string[] =  ['id', 'ean', 'name', 'price', 'itemType', 'quantity'];
  public searchField = false;
  supplier:SuppliersDTO;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private itemService: ItemsService, private formBuilder: FormBuilder, private supplierService: SupplierService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.buildItemForm();
    let supplierId = this.route.snapshot.params['id'];
    supplierId = parseInt(supplierId);
    if (Number.isInteger(supplierId)) {
      this.editingSupplier = true;
      this.supplierService.getSupplierByID(supplierId).subscribe(supplier => {
        this.supplier = supplier;
        console.log(this.supplier);
        // this.supplierService.getAssocations(supplierId).subscribe();
        // if(supplier.items != null){
        //   this.associatedItems = new MatTableDataSource(this.supplier.items);
        // } else {
        //   const items: ItemDto[] = [];
        //   this.associatedItems = new MatTableDataSource(items);
        // }

        /*
        *
        * Add functionality for retrieving items associated with given supplier
        *
         */




      });
    } else {
      const items: ItemDto[] = [];
      this.associatedItems = new MatTableDataSource(items);
    }
  }

  public buildItemForm(supplier?: SuppliersDTO): void {
    this.supplierForm = this.formBuilder.group({
      Name: [supplier?.name ? supplier.name : '', Validators.required],
    });
  }

  public ngAfterViewInit(): void {
    this.itemService.getAllItems().subscribe(items => {
      this.browseItems = new MatTableDataSource(items);
      this.loading = false;
      this.browseItems.paginator = this.paginator;
    });
  }

  public addItem(itemId: number): void {
    this.itemService.getItemById(itemId).subscribe(item=>{
      if(this.associatedItems.data.find(x => x.id == itemId) === undefined){
        this.associatedItems.data.push(item);
        this.associatedItems._updateChangeSubscription();
      } else {
        this.messageService.show('Vare er allerede tilknyttet');
      }
    });
  }

  public enableSearch():void{
    if(this.searchField == false){
      this.searchField = true;
    } else {
      this.searchField = false;
    }
  }

  public clearValues():void{
    this.associatedItems.data.pop();
    this.associatedItems._updateChangeSubscription();
    this.supplierForm.reset();
    this.searchField = false;
  }

  public submitSupplier(): void {
    const newSupplier = this.supplierForm?.value as SuppliersDTO;
    newSupplier.items = this.associatedItems.data;
    this.supplierService.createItem(newSupplier).subscribe(value => {
      this.clearValues();
      this.messageService.show('Supplier created');
    }, () => {
      console.log('error');
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.browseItems.filter = filterValue.trim().toLowerCase();

    if (this.browseItems.paginator) {
      this.browseItems.paginator.firstPage();
    }
  }

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


  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly ItemType = ItemType;
}
