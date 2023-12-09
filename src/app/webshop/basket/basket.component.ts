import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { OrderService } from '../../shared/services/order/order.service';
import { PurchaseOrder } from '../../shared/models/purchase-order';
import { Role } from '../../shared/enums/role';
import { MatTableDataSource } from '@angular/material/table';
import { OrderLine } from '../../shared/models/order-line';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent{

  loggedIn = false;
  loading = true;

  currentPurchaseOrder: PurchaseOrder;
  orderLines: MatTableDataSource<OrderLine> = new MatTableDataSource<OrderLine>();

  public displayedColumns: string[] = ['imageUrl', 'name', 'itemPrice', 'quantity', 'price', 'remove'];

  constructor(public router: Router, private authenticationService: AuthenticationService, private messageService: MessageService,
              private orderService: OrderService) {
    this.loggedIn = this.authenticationService.getLoggedIn();

    this.currentPurchaseOrder = this.orderService.getCurrentPurchaseOrder();

    this.orderLines = new MatTableDataSource(this.currentPurchaseOrder.orderLines);
    this.loading = false;
  }

  /**
   * Sort table data given an event
   * @param event the event
   */
  public sortData(event: any): void {
    const data = this.orderLines.data.slice();
    if (!event.active || event.direction === '') {
      this.orderLines.data = data;
      return;
    }

    this.orderLines.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        case 'name':
          return this.compare(a.item.name, b.item.name, isAsc);
        case 'itemPrice':
          return this.compare(a.item.price, b.item.price, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public removeOrderLine(orderLine: OrderLine): void {
    this.orderService.removeOrderLineFromCurrentPurchaseOrder(orderLine);
    this.currentPurchaseOrder = this.orderService.getCurrentPurchaseOrder();
    this.orderLines.data = this.currentPurchaseOrder.orderLines;
  }

  public resetPurchaseOrder(): void {
    this.orderService.resetCurrentPurchaseOrder();
    this.currentPurchaseOrder = this.orderService.getCurrentPurchaseOrder();
    this.orderLines.data = this.currentPurchaseOrder.orderLines;
  }

  public goToPayment(): void {
    this.router.navigate(['/webshop/checkout']);
  }

  public updateLineQuantity(orderLine: OrderLine): void {
    orderLine.price = Math.round(orderLine.item.price * orderLine.quantity*100)/100;
    orderLine.quantity = Number(orderLine.quantity);
  }

  protected readonly Role = Role;
}


