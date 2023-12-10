import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InboundOrder } from '../../shared/models/inbound-order';
import { InboundOrderState } from '../../shared/enums/inbound-order-state';
import { OrderService } from '../../shared/services/order/order.service';
import { SupplierDto } from '../../shared/models/supplier-dto';
import { SupplierService } from '../../shared/services/suppliers/supplier.service';
import { ItemType } from '../../shared/enums/item-type';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { OrderLine } from '../../shared/models/order-line';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-inbound-order',
  templateUrl: './create-inbound-order.component.html',
  styleUrls: ['./create-inbound-order.component.scss'],
})

export class CreateInboundOrderComponent {
  loading = true;
  editing = false;
  inboundOrderForm: FormGroup;
  suppliers: SupplierDto[] = [];
  search = '';
  filteredItems: ItemDto[];
  allItems: ItemDto[];
  orderLines: MatTableDataSource<OrderLine> = new MatTableDataSource<OrderLine>();
  associatedColumns: string[] =  ['id', 'linePrice', 'remove'];

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService, private messageService: MessageService,
              private route: ActivatedRoute, private location: Location, private orderService: OrderService,
              private router: Router, private itemService: ItemsService)
  {
    this.getInboundOrderAndBuildForm();
    this.supplierService.getAllSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
    this.getAllItems();
  }

  /**
   * Gets all items
   */
  public getAllItems(): void {
    this.itemService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.loading = false;
    });
  }

  /**
   * Gets the item and builds the form
   */
  public getInboundOrderAndBuildForm(): void {
    let id = null;
    const idString = this.route.snapshot.params['id'];

    id = parseInt(idString);

    if(!Number.isInteger(id)) {
      this.buildInboundOrderForm();
      this.editing = false;
      this.loading = false;
      return;
    }

    this.orderService.getInboundOrderById(id).subscribe(inboundOrder => {
      this.editing = true;
      this.buildInboundOrderForm(inboundOrder);
      this.loading = false;
    });
  }

  /**
   * Adds an item to the table given an itemDto
   * @param event the event from the mat select
   */
  public addItemToOrderLines(event: any): void {
    const itemId = event.option.value.id;
    const associatedOrderLine = this.orderLines.data.find(ol => ol.item.id === itemId);
    if(!associatedOrderLine){
      const item = this.allItems.find(item => item.id === itemId);
      this.orderLines.data.push(new OrderLine(item.quantity, item));
      const updatedData = this.orderLines.data;
      this.orderLines.data = updatedData;
      this.messageService.show('Vare tilknyttet til leverandør');
      this.search = '';
    } else {
      this.messageService.show('Vare er allerede tilknyttet');
      this.search = '';
    }
    this.search = '';
  }

  /**
   * Removes an orderLine from the table
   * @param orderLine the ordeline to remove
   */
  public removeOrderLineFromTable(orderLine: OrderLine): void {
    this.orderLines.data = this.orderLines.data.filter(ol => ol.id !== orderLine.id);
  }

  /**
   * Builds the form given an optional inboundOrder to build the form from
   * @param inboundOrder the optional inboundOrder
   */
  public buildInboundOrderForm(inboundOrder?: InboundOrder): void {
    this.inboundOrderForm = this.formBuilder.group({
      supplier: [inboundOrder?.supplier ? inboundOrder?.supplier : null, Validators.required],
      orderState: [inboundOrder ? Number.isInteger(inboundOrder.orderState) ? InboundOrderState[inboundOrder.orderState] : InboundOrderState.Open : InboundOrderState.Open, Validators.required],
      orderDate: [inboundOrder?.orderDate ? inboundOrder?.orderDate : new Date(), Validators.required],
      deliveryDate: [inboundOrder?.deliveryDate ? inboundOrder?.deliveryDate : new Date(), Validators.required],
    });
  }

  /**
   * The Submit of the item form
   */
  public submitInboundOrder(): void {
    const inboundOrder = this.inboundOrderForm?.value as InboundOrder;

    if(inboundOrder == null){
      this.messageService.show('Fejl: Produkt må ikke være nul');
      return;
    }

    if(this.inboundOrderForm?.valid == false){
      this.messageService.show('Fejl: Produkt formen indeholder fejl');
      return;
    }

    if (this.editing) {
      inboundOrder.id = parseInt(this.route.snapshot.params['id']);
      return this.submitEditInboundOrder(inboundOrder);
    }

    return this.submitCreateInboundOrder(inboundOrder);
  }

  /**
   * Edits an inboundOrder
   * @param inboundOrder the new values of the inboundOrder as an inboundOrder
   */
  public submitEditInboundOrder(inboundOrder: InboundOrder): void {
    this.orderService.editInboundOrder(inboundOrder).subscribe(item => {
      this.buildInboundOrderForm(item);
      this.messageService.show('Bestillings ordre redigeret');
    }, error => {
      this.messageService.showError(error);
    });
  }

  /**
   * Creates an inboundOrder
   * @param inboundOrder the inboundOrder to create
   */
  public submitCreateInboundOrder(inboundOrder: InboundOrder): void{
    this.orderService.createInboundOrder(inboundOrder).subscribe(inboundOrder => {
      this.router.navigate(['/warehouse/edit-inbound-order/' + inboundOrder.id]);
      this.messageService.show('Bestillings ordre oprettet');
    }, error => {
      this.messageService.showError(error);
    });
  }

  /**
   * The search function for searching through all items
   */
  public applySearch(): void {
    this.filteredItems = this.allItems.filter(item =>
      item.name.toLowerCase().includes(this.search) || item.ean.toLowerCase().includes(this.search)
      || item.id.toString().includes(this.search) || ItemType[item.itemType].toString().includes(this.search)
    );
  }

  /**
   * Deletes an inboundOrder
   */
  public deleteInboundOrder(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.orderService.deleteInboundOrder(id).subscribe(res => {
      if(!res) {
        this.messageService.show('Der gik noget galt da Bestillings ordre blev forsøgt slettet');
        this.loading = false;
        return;
      }

      this.messageService.show('Produkt slettet');
      this.location.back();
      this.loading = false;
    });
  }

  /**
   * Sorts the data off the tables
   * @param event the event from the table
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
        case 'linePrice':
          return this.compare(a.linePrice, b.linePrice, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  protected readonly InboundOrderState = InboundOrderState;
  protected readonly ItemType = ItemType;
}

