import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';
import { PurchaseOrderDto } from '../../shared/interfaces/purchase-order-dto';
import { OrderService } from '../../shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  loading = false;
  orders: MatTableDataSource<PurchaseOrderDto> = new MatTableDataSource<PurchaseOrderDto>();

  public displayedColumns: string[] = ['id', 'purchaseOrderState', 'orderDate', 'deliveryDate', 'totalPrice', 'supplier'];

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = new MatTableDataSource(orders);
    });
  }

  public editOrder(orderId: number): void {
    this.router.navigate([`/warehouse/order/${orderId}`]);
  }

  /**
   * Sort table data given an event
   * @param event the event
   */
  /*
  public sortData(event: any): void {
    const data = this.orders.data.slice();
    if (!event.active || event.direction === '') {
      this.orders.data = data;
      return;
    }

    this.orders.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'customerName':
          return this.compare(a.customerName, b.customerName, isAsc);
        case 'orderDate':
          return this.compare(a.orderDate, b.orderDate, isAsc);
        case 'totalAmount':
          return this.compare(a.totalAmount, b.totalAmount, isAsc);
        case 'status':
          return this.compare(a.status ? a.status.toString() : '', b.status ? b.status.toString() : '', isAsc);
        default:
          return 0;
      }
    });
  }*/

  /*
  private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean): number {
    if (typeof a === 'number' && typeof b === 'number') {
      return (a - b) * (isAsc ? 1 : -1);
    } else if (typeof a === 'string' && typeof b === 'string') {
      return (a.localeCompare(b)) * (isAsc ? 1 : -1);
    } else if (a instanceof Date && b instanceof Date) {
      return (a.getTime() - b.getTime()) * (isAsc ? 1 : -1);
    } else {
      return 0;
    }
  }
*/
  public logout(): void {
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly Role = Role;
}
