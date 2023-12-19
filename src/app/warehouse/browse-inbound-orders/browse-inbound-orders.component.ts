import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';
import { OrderService } from '../../shared/services/order/order.service';
import { InboundOrder } from '../../shared/models/inbound-order';
import { TableColumn } from '../../shared/models/table-column';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-browse-inbound-orders',
  templateUrl: './browse-inbound-orders.component.html',
  styleUrls: ['./browse-inbound-orders.component.scss']
})
export class BrowseInboundOrdersComponent{
  inboundOrders: MatTableDataSource<InboundOrder>;

  public displayedColumns: TableColumn[] = [
    { key: 'id', value: 'Id' }, { key: 'orderState', value: 'Ordre status' }, { key: 'orderDate', value: 'Ordre dato' },
    { key: 'deliveryDate', value: 'Leverings dato' }, { key: 'totalPrice', value: 'Total pris' }, { key: 'supplier', value: 'Leverandør' }
  ];

  constructor(private orderService: OrderService, private messageService: MessageService, private authenticationService: AuthenticationService,
    private router: Router)
  {
    this.orderService.getAllInboundOrders().subscribe(inboundOrders => {
      this.inboundOrders = new MatTableDataSource<InboundOrder>(inboundOrders);
    });
  }

  public editOrder(orderId: number): void {
    this.router.navigate([`/warehouse/edit-inbound-order/${orderId}`]);
  }

  protected readonly Role = Role;
}
