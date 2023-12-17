import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { OrderService } from '../../shared/services/order/order.service';
import { PurchaseOrder } from '../../shared/models/purchase-order';
import { Role } from '../../shared/enums/role';
import { MatTableDataSource } from '@angular/material/table';
import { OrderLine } from '../../shared/models/order-line';
import { TableColumn } from '../../shared/models/table-column';
import { TableColumnType } from '../../shared/enums/table-column-type';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent{

  loggedIn = false;
  loading = true;

  currentPurchaseOrder: PurchaseOrder;
  orderLines: MatTableDataSource<OrderLine>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: TableColumn[] = [
    { key: 'itemName', value: 'Navn' }, { key: 'quantity', value:'Antal', type: TableColumnType.numberInput },
    { key: 'itemPrice', value: 'Pris', type: TableColumnType.price }, { key: 'linePrice', value: 'Total', type:TableColumnType.price },
  ];

  constructor(public router: Router, private authenticationService: AuthenticationService, private orderService: OrderService,
              private messageService: MessageService) {
    this.loggedIn = this.authenticationService.getLoggedIn();

    this.currentPurchaseOrder = this.orderService.getCurrentPurchaseOrder();

    this.orderLines = new MatTableDataSource(this.currentPurchaseOrder.orderLines);
    this.loading = false;
  }

  /**
   * Removes the orderLine from the purchaseOrder
   * @param id the id of the orderLine to remove
   */
  public removeOrderLine(id: number): void {
    const orderLine = this.orderLines.data.find(orderLine => orderLine.id === id);
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
    if(orderLine.quantity > 0) {
      orderLine.linePrice = Math.round(orderLine.item.price * orderLine.quantity * 100) / 100;
    }else{
      this.messageService.show('Antal skal være større end 0');
      orderLine.quantity = 1;
    }
  }

  protected readonly Role = Role;
}


