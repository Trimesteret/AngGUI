import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SupplierService } from '../../shared/services/suppliers/supplier.service';
import { MatPaginator } from '@angular/material/paginator';
import { SupplierDto } from '../../shared/models/supplier-dto';

@Component({
  selector: 'app-browse-suppliers',
  templateUrl: './browse-suppliers.component.html',
  styleUrls: ['./browse-suppliers.component.scss']
})
export class BrowseSuppliersComponent implements AfterViewInit{
  suppliers: MatTableDataSource<SupplierDto>;
  loading = true;

  public displayedColumns: string[] = ['id', 'name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private supplerService: SupplierService, private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) {
  }

  public ngAfterViewInit(): void {
    this.supplerService.getAllSuppliers().subscribe(suppliers => {
      this.suppliers = new MatTableDataSource(suppliers);
      this.loading = false;
      this.suppliers.paginator = this.paginator;
    });
  }

  public editSupplier(itemId: number): void {
    this.router.navigate([`/warehouse/edit-supplier/${itemId}`]);
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.suppliers.filter = filterValue.trim().toLowerCase();

    if (this.suppliers.paginator) {
      this.suppliers.paginator.firstPage();
    }
  }

  public sortData(event: any): void {
    const data = this.suppliers.data.slice();
    if (!event.active || event.direction === '') {
      this.suppliers.data = data;
      return;
    }

    this.suppliers.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
