import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';
import { OrderService } from '../../shared/services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { PurchaseOrder } from '../../shared/models/purchase-order';
import { TableColumn } from '../../shared/models/table-column';
import { TableColumnType } from '../../shared/enums/table-column-type';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-browse-purchase-orders',
  templateUrl: './browse-purchase-orders.component.html',
  styleUrls: ['./browse-purchase-orders.component.scss']
})
export class BrowsePurchaseOrdersComponent{
  purchaseOrders: MatTableDataSource<PurchaseOrder>;

  public displayedColumns: TableColumn[] = [
    { key: 'id', value: 'Id' }, { key: 'purchaseOrderState', value: 'Ordre status' }, { key: 'orderDate', value: 'Ordre dato', type: TableColumnType.date },
    { key: 'deliveryDate', value: 'Leverings dato', type: TableColumnType.date }, { key: 'totalPrice', value: 'Total pris' }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private orderService: OrderService, private messageService: MessageService, private authenticationService: AuthenticationService,
    private router: Router)
  {
    this.orderService.getAllPurchaseOrders().subscribe(purchaseOrders => {
      this.purchaseOrders = new MatTableDataSource<PurchaseOrder>(purchaseOrders);
      this.purchaseOrders.paginator = this.paginator;
    });
  }

  public editOrder(orderId: number): void {
    this.router.navigate([`/warehouse/edit-purchase-order/${orderId}`]);
  }

  protected readonly Role = Role;
}
