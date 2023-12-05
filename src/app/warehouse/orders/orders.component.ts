import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';
import { PurchaseOrderDto } from '../../shared/interfaces/purchase-order-dto';
import { OrderService } from '../../shared/services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit{
  loading = false;
  orders: MatTableDataSource<PurchaseOrderDto> = new MatTableDataSource<PurchaseOrderDto>();

  public displayedColumns: string[] = ['id', 'purchaseOrderState', 'orderDate', 'deliveryDate', 'totalPrice', 'supplier'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private router: Router) {
  }
  public ngAfterViewInit():void{
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = new MatTableDataSource(orders);
      console.log(orders);
      console.log(orders[0].purchaseOrderState);
      this.loading = false;
      this.orders.paginator = this.paginator;
    });
  }

  public editOrder(orderId: number): void {
    this.router.navigate([`/warehouse/order/${orderId}`]);
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();

    if (this.orders.paginator) {
      this.orders.paginator.firstPage();
    }
  }
  public sortData(event: any): void {
    const data = this.orders.data.slice(); // Make a copy of the data array
    if (!event.active || event.direction === '') {
      this.orders.data = data; // Default to unsorted data
      return;
    }

    this.orders.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);

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
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly Role = Role;
}
