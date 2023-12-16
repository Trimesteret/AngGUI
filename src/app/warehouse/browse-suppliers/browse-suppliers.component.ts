import { Component, ViewChild } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SupplierService } from '../../shared/services/suppliers/supplier.service';
import { MatPaginator } from '@angular/material/paginator';
import { SupplierDto } from '../../shared/models/supplier-dto';
import { TableColumn } from '../../shared/models/table-column';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-browse-suppliers',
  templateUrl: './browse-suppliers.component.html',
  styleUrls: ['./browse-suppliers.component.scss']
})
export class BrowseSuppliersComponent{
  suppliers: MatTableDataSource<SupplierDto>;

  displayedColumns: TableColumn[] = [{ key: 'id', value: 'Id' }, { key: 'name', value: 'Navn' }];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private supplerService: SupplierService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router)
  {
    this.supplerService.getAllSuppliers().subscribe(suppliers => {
      this.suppliers = new MatTableDataSource<SupplierDto>(suppliers);
      this.suppliers.paginator = this.paginator;
    });
  }

  public editSupplier(itemId: number): void {
    this.router.navigate([`/warehouse/edit-supplier/${itemId}`]);
  }
}
