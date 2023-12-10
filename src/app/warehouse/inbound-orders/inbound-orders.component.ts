import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';
import { OrderService } from '../../shared/services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { InboundOrder } from '../../shared/models/inbound-order';

@Component({
  selector: 'app-inbound-orders',
  templateUrl: './inbound-orders.component.html',
  styleUrls: ['./inbound-orders.component.scss']
})
export class InboundOrdersComponent implements AfterViewInit{
  loading = true;
  inboundOrders: MatTableDataSource<InboundOrder> = new MatTableDataSource<InboundOrder>();

  public displayedColumns: string[] = ['id', 'orderState', 'orderDate', 'deliveryDate', 'totalPrice', 'supplier'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private orderService: OrderService, private messageService: MessageService, private authenticationService: AuthenticationService,
    private router: Router) {}

  public ngAfterViewInit():void{
    this.orderService.getAllInboundOrders().subscribe(inboundOrders => {
      this.inboundOrders = new MatTableDataSource(inboundOrders);
      this.loading = false;
      this.inboundOrders.paginator = this.paginator;
    });
  }

  public editOrder(orderId: number): void {
    this.router.navigate([`/warehouse/order/${orderId}`]);
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inboundOrders.filter = filterValue.trim().toLowerCase();

    if (this.inboundOrders.paginator) {
      this.inboundOrders.paginator.firstPage();
    }
  }

  public sortData(event: any): void {
    const data = this.inboundOrders.data.slice();
    if (!event.active || event.direction === '') {
      this.inboundOrders.data = data;
      return;
    }

    this.inboundOrders.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'orderState':
          return this.compare(a.orderState, b.orderState, isAsc);
        case 'orderDate':
          return this.compare(a.orderDate.valueOf(), b.orderDate.valueOf(), isAsc);
        case 'deliveryDate':
          return this.compare(a.deliveryDate.valueOf(), b.deliveryDate.valueOf(), isAsc);
        case 'supplier':
          return this.compare(a.supplier.name, b.supplier.name, isAsc);
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
