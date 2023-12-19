import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../shared/enums/role';
import { OrderService } from '../../shared/services/order/order.service';
import { InboundOrder } from '../../shared/models/inbound-order';
import { TableColumn } from '../../shared/models/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnType } from '../../shared/enums/table-column-type';
import { InboundOrderState } from '../../shared/enums/inbound-order-state';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-browse-inbound-orders',
  templateUrl: './browse-inbound-orders.component.html',
  styleUrls: ['./browse-inbound-orders.component.scss']
})
export class BrowseInboundOrdersComponent{
  inboundOrders: MatTableDataSource<InboundOrder>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: TableColumn[] = [
    { key: 'id', value: 'Id' }, { key: 'inboundOrderState', value: 'Ordre status', type: TableColumnType.enum, enum: InboundOrderState },
    { key: 'orderDate', value: 'Ordre dato', type: TableColumnType.date }, { key: 'deliveryDate', value: 'Leverings dato', type: TableColumnType.date },
    { key: 'totalPrice', value: 'Total pris', type: TableColumnType.price }, { key: 'supplierName', value: 'Leverandør' }
  ];

  constructor(private orderService: OrderService, private router: Router)
  {
    this.orderService.getAllInboundOrders().subscribe(inboundOrders => {
      this.inboundOrders = new MatTableDataSource<InboundOrder>(inboundOrders);
      this.inboundOrders.paginator = this.paginator;
    });
  }

  public editOrder(orderId: number): void {
    this.router.navigate([`/warehouse/edit-inbound-order/${orderId}`]);
  }

  protected readonly Role = Role;
}
