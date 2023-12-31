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
  selector: 'app-create-edit-inbound-order',
  templateUrl: './create-edit-inbound-order.component.html',
  styleUrls: ['./create-edit-inbound-order.component.scss'],
})

export class CreateEditInboundOrderComponent {
  loading = true;
  editing = false;
  inboundOrderForm: FormGroup;
  suppliers: SupplierDto[] = [];
  search = '';
  filteredSupplierItems: ItemDto[];
  supplierItems: ItemDto[];
  selectedSupplier: SupplierDto;
  orderLines: MatTableDataSource<OrderLine> = new MatTableDataSource<OrderLine>();
  associatedColumns: string[] =  ['itemName', 'quantity', 'linePrice', 'remove'];

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService, private messageService: MessageService,
              private route: ActivatedRoute, private location: Location, private orderService: OrderService,
              private router: Router, private itemService: ItemsService)
  {
    this.getInboundOrderAndBuildForm();
    this.supplierService.getAllSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  /**
   * Gets all items
   */
  public getSupplierRelatedItems(): void {
    this.itemService.getSupplierRelatedItems(this.selectedSupplier?.id).subscribe(items => {
      this.supplierItems = items;
      this.supplierItems = this.supplierItems.filter(item => !this.orderLines.data.find(orderLine => orderLine.item.id === item.id));
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
    const associatedOrderLine = this.orderLines.data.find(ol => ol.itemId === itemId);
    if(!associatedOrderLine){
      const item = this.supplierItems.find(item => item.id === itemId);
      this.orderLines.data.push(new OrderLine(1, item));
      this.supplierItems = this.supplierItems.filter(item => !this.orderLines.data.find(orderLine => orderLine.item.id === item.id));
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
    this.orderLines.data = this.orderLines.data.filter(ol => ol.itemId !== orderLine.itemId);
    this.getSupplierRelatedItems();
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

    if(this.editing) {
      this.inboundOrderForm.controls['supplier'].disable();
    }

    this.inboundOrderForm.controls['supplier'].valueChanges.subscribe(value => {
      this.selectedSupplier = value;
      this.getSupplierRelatedItems();
    });
  }

  /**
   * The Submit of the inbound order form
   */
  public submitInboundOrder(): void {
    const inboundOrder = this.inboundOrderForm?.value as InboundOrder;

    if(inboundOrder == null){
      this.messageService.show('Fejl: Bestillings ordren må ikke være nul');
      return;
    }

    if(this.inboundOrderForm?.valid == false){
      this.messageService.show('Fejl: Bestillings ordre formen indeholder fejl');
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
    this.filteredSupplierItems = this.supplierItems.filter(item =>
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

  protected readonly InboundOrderState = InboundOrderState;
  protected readonly ItemType = ItemType;
}

