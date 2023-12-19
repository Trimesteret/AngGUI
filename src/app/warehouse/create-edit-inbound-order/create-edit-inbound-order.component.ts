import { Component, ViewChild } from '@angular/core';
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
import { TableColumn } from '../../shared/models/table-column';
import { OrderLineDto } from '../../shared/interfaces/order-line-dto';
import { MatPaginator } from '@angular/material/paginator';
import { TableColumnType } from '../../shared/enums/table-column-type';

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
  orderLines: MatTableDataSource<OrderLineDto> = new MatTableDataSource<OrderLineDto>();
  displayedColumns: TableColumn[] = [{ key: 'itemName', value: 'Vare navn' }, { key: 'quantity', value: 'Antal', type: TableColumnType.numberInput },
    { key: 'itemPrice', value: 'Vare pris', type: TableColumnType.price }, { key: 'linePrice', value: 'Linje pris', type: TableColumnType.price }];

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
   * Gets the item and builds the form
   */
  public getInboundOrderAndBuildForm(): void {
    const idString = this.route.snapshot.params['id'];

    const id = parseInt(idString);

    if (!Number.isInteger(id)) {
      this.buildInboundOrderForm();
      this.editing = false;
      this.loading = false;
      return;
    }

    this.orderService.getInboundOrderById(id).subscribe(inboundOrder => {
      this.editing = true;
      this.loading = false;
      this.buildInboundOrderForm(inboundOrder);
      this.orderLines = new MatTableDataSource(inboundOrder.orderLines);
      this.orderLines.paginator = this.paginator;
    },
    (error) => {
      console.error(error);
      this.loading = false;
    });
  }

  /**
   * Gets all items
   */
  public getSupplierRelatedItems(): void {
    console.log(this.selectedSupplier);
    this.itemService.getSupplierRelatedItems(this.selectedSupplier?.id).subscribe(items => {
      this.supplierItems = items.filter(item => !this.orderLines.data.find(orderLine => orderLine.itemId === item.id));
      this.loading = false;
    });
  }

  /**
   * Adds an item to the table given an itemDto
   * @param event the event from the mat select
   */
  public addItemToOrderLines(event: any): void {
    const itemId = event?.option?.value;

    const associatedOrderLine = this.orderLines.data.find(ol => ol.itemId === itemId);
    if(!associatedOrderLine){
      const item = this.supplierItems.find(item => item.id === itemId);
      this.orderLines.data.push(new OrderLine(1, item));
      this.supplierItems = this.supplierItems.filter(item => !this.orderLines.data.find(orderLine => orderLine.itemId === item.id));
      const updatedData = this.orderLines.data;
      this.orderLines.data = updatedData;
      this.messageService.show('Vare tilføjet til bestillings ordre');
      this.search = '';
    } else {
      this.messageService.show('Vare er allerede tilføjet til bestillings ordre');
      this.search = '';
    }
    this.search = '';
  }

  /**
   * Removes an orderLine from the table
   * @param id the ordeline id to remove
   */
  public removeOrderLineFromTable(id: number): void {
    this.orderLines.data = this.orderLines.data.filter(ol => ol.id !== id);
    this.getSupplierRelatedItems();
  }

  /**
   * Builds the form given an optional inboundOrder to build the form from
   * @param inboundOrder the optional inboundOrder
   */
  public buildInboundOrderForm(inboundOrder?: InboundOrder): void {
    this.inboundOrderForm = this.formBuilder.group({
      supplierId: [inboundOrder?.supplier?.id ? inboundOrder?.supplier.id : null, Validators.required],
      orderState: [inboundOrder ? Number.isInteger(inboundOrder.inboundOrderState) ? inboundOrder.inboundOrderState : InboundOrderState.Open : InboundOrderState.Open, Validators.required],
      orderDate: [inboundOrder?.orderDate ? inboundOrder?.orderDate : new Date(), Validators.required],
      deliveryDate: [inboundOrder?.deliveryDate ? inboundOrder?.deliveryDate : new Date(), Validators.required],
    });

    if(this.editing) {
      this.selectedSupplier = inboundOrder.supplier;
      this.getSupplierRelatedItems();
      this.inboundOrderForm.controls['supplierId'].disable();
    }

    this.inboundOrderForm.controls['supplierId'].valueChanges.subscribe(id => {
      this.selectedSupplier = this.suppliers.find(supplier => supplier.id == id);
      this.getSupplierRelatedItems();
    });
  }

  /**
   * Edits an orderLine in the table
   * @param element
   */
  public editOrderLineInTable(element: OrderLine): void {
    const orderLine = this.orderLines.data.find(ol => ol.id === element.id);
    orderLine.quantity = element.quantity;
    orderLine.linePrice = element.itemPrice * element.quantity;
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

    this.selectedSupplier = this.suppliers.find(supplier => supplier.id == this.inboundOrderForm.controls['supplierId'].value);
    inboundOrder.supplier = this.selectedSupplier;
    inboundOrder.orderLines = this.orderLines.data;

    if(this.inboundOrderForm?.valid == false){
      this.messageService.show('Fejl: Bestillings ordre formen indeholder fejl');
      return;
    }

    if (this.editing) {
      const idString = this.route.snapshot.params['id'];

      inboundOrder.id = parseInt(idString);

      return this.submitEditInboundOrder(inboundOrder);
    }

    return this.submitCreateInboundOrder(inboundOrder);
  }

  /**
   * Edits an inboundOrder
   * @param inboundOrder the new values of the inboundOrder as an inboundOrder
   */
  public submitEditInboundOrder(inboundOrder: InboundOrder): void {
    this.orderService.editInboundOrder(inboundOrder).subscribe(inboundOrder => {
      console.log(inboundOrder);
      this.buildInboundOrderForm(inboundOrder);
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
  public deleteOrder(): void {
    const id = parseInt(this.route.snapshot.params['id']);
    this.loading = true;
    this.orderService.deleteOrder(id).subscribe(res => {
      if(!res) {
        this.messageService.show('Der gik noget galt da Bestillings ordre blev forsøgt slettet');
        this.loading = false;
        return;
      }

      this.messageService.show('Bestillings ordre blev slettet');
      this.location.back();
      this.loading = false;
    });
  }

  protected readonly InboundOrderState = InboundOrderState;
  protected readonly ItemType = ItemType;
}

