import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';
import { OrderDto } from '../../shared/interfaces/order-dto';
import { OrderService } from '../../shared/services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit{
  loading = true;
  orders: MatTableDataSource<OrderDto> = new MatTableDataSource<OrderDto>();

  public displayedColumns: string[] = ['id', 'orderState', 'orderDate', 'deliveryDate', 'totalPrice', 'supplier'];

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
        case 'orderState':
          return this.compare(a.orderState, b.orderState, isAsc);
        case 'orderDate':
          return this.compare(a.orderDate, b.orderDate, isAsc);
        case 'deliveryDate':
          return this.compare(a.deliveryDate, b.deliveryDate, isAsc);
        case 'totalPrice':
          return this.compare(a.totalPrice, b.totalPrice, isAsc);
        case 'supplier':
          return this.compare(a.supplier, b.supplier, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
  protected readonly Role = Role;
}
