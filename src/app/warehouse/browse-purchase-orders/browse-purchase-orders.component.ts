import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';
import { OrderService } from '../../shared/services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { InboundOrder } from '../../shared/models/inbound-order';
import { PurchaseOrder } from '../../shared/models/purchase-order';

@Component({
  selector: 'app-browse-purchase-orders',
  templateUrl: './browse-purchase-orders.component.html',
  styleUrls: ['./browse-purchase-orders.component.scss']
})
export class BrowsePurchaseOrdersComponent implements AfterViewInit{
  loading = true;
  purchaseOrders: MatTableDataSource<PurchaseOrder> = new MatTableDataSource<PurchaseOrder>();

  public displayedColumns: string[] = ['id', 'purchaseOrderState', 'orderDate', 'deliveryDate', 'totalPrice'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private orderService: OrderService, private messageService: MessageService, private authenticationService: AuthenticationService,
    private router: Router) {}

  public ngAfterViewInit():void{
    this.orderService.getAllPurchaseOrders().subscribe(purchaseOrders => {
      this.purchaseOrders = new MatTableDataSource(purchaseOrders);
      this.loading = false;
      this.purchaseOrders.paginator = this.paginator;
    });
  }

  public editOrder(orderId: number): void {
    this.router.navigate([`/warehouse/edit-purchase-order/${orderId}`]);
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.purchaseOrders.filter = filterValue.trim().toLowerCase();

    if (this.purchaseOrders.paginator) {
      this.purchaseOrders.paginator.firstPage();
    }
  }

  public sortData(event: any): void {
    const data = this.purchaseOrders.data.slice();
    if (!event.active || event.direction === '') {
      this.purchaseOrders.data = data;
      return;
    }

    this.purchaseOrders.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'purchaseOrderState':
          return this.compare(a.purchaseOrderState, b.purchaseOrderState, isAsc);
        case 'orderDate':
          return this.compare(a.orderDate.valueOf(), b.orderDate.valueOf(), isAsc);
        case 'deliveryDate':
          return this.compare(a.deliveryDate.valueOf(), b.deliveryDate.valueOf(), isAsc);
        case 'totalPrice':
          return this.compare(a.totalPrice, b.totalPrice, isAsc);
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
