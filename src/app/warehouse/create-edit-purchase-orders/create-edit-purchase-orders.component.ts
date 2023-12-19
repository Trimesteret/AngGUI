import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierDto } from '../../shared/models/supplier-dto';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { SupplierService } from '../../shared/services/suppliers/supplier.service';
import { MessageService } from '../../shared/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../shared/services/order/order.service';
import { ItemsService } from '../../shared/services/items/items.service';
import { PurchaseOrderState } from '../../shared/enums/purchase-order-state';
import { PurchaseOrder } from '../../shared/models/purchase-order';
import { TableColumn } from '../../shared/models/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderLineDto } from '../../shared/interfaces/order-line-dto';
import { TableColumnType } from '../../shared/enums/table-column-type';
import { OrderLine } from '../../shared/models/order-line';
import { ItemType } from '../../shared/enums/item-type';

@Component({
  selector: 'app-create-edit-purchase-orders',
  templateUrl: './create-edit-purchase-orders.component.html',
  styleUrls: ['./create-edit-purchase-orders.component.scss']
})
export class CreateEditPurchaseOrdersComponent{
  loading = true;
  editing = false;
  purchaseOrderForm: FormGroup;
  suppliers: SupplierDto[] = [];
  allItems: ItemDto[];
  filteredItems: ItemDto[];
  orderLines: MatTableDataSource<OrderLineDto> = new MatTableDataSource<OrderLineDto>();
  displayedColumns: TableColumn[] = [{ key: 'itemName', value: 'Vare navn' },
    { key: 'quantity', value: 'Antal', type: TableColumnType.numberInput }, { key: 'itemPrice', value: 'Vare pris', type: TableColumnType.price },
    { key: 'linePrice', value: 'Linje pris', type: TableColumnType.price }];

  search: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService, private messageService: MessageService,
              private route: ActivatedRoute, private location: Location, private orderService: OrderService,
              private router: Router, private itemService: ItemsService) {
    itemService.getAllItems().subscribe(items => {
      this.allItems = items;
    });
    this.getPurchaseOrderAndBuildForm();
    this.supplierService.getAllSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
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
   * Edits an orderLine in the table
   * @param element
   */
  public editOrderLineInTable(element: OrderLine): void {
    const orderLine = this.orderLines.data.find(ol => ol.id === element.id);
    orderLine.quantity = element.quantity;
    orderLine.linePrice = element.itemPrice * element.quantity;
  }

  /**
   * Removes an orderLine from the purchaseOrder
   * @param id the id of the orderLine to remove
   */
  public removeOrderLine(id: number): void {
    this.orderLines.data = this.orderLines.data.filter(orderLine => orderLine.id !== id);
  }

  /**
   * Gets the item and builds the form
   */
  public getPurchaseOrderAndBuildForm(): void {
    const idString = this.route.snapshot.params['id'];

    const id = parseInt(idString);

    if (!Number.isInteger(id)) {
      this.buildPurchaseOrderForm();
      this.editing = false;
      this.loading = false;
      return;
    }

    this.orderService.getPurchaseOrderById(id).subscribe(purchaseOrder => {
      this.orderLines = new MatTableDataSource(purchaseOrder.orderLines);
      this.orderLines.paginator = this.paginator;
      this.editing = true;
      this.loading = false;
      this.buildPurchaseOrderForm(purchaseOrder);
    },
    (error) => {
      console.error('Error fetching purchase order:', error);
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
      const item = this.allItems.find(item => item.id === itemId);
      this.orderLines.data.push(new OrderLine(1, item));
      this.allItems = this.allItems.filter(item => !this.orderLines.data.find(orderLine => orderLine.itemId === item.id));
      const updatedData = this.orderLines.data;
      this.orderLines.data = updatedData;
      this.messageService.show('Vare tilføjet til kunde ordre');
      this.search = '';
    } else {
      this.messageService.show('Vare er allerede tilføjet til kunde ordre');
      this.search = '';
    }
    this.search = '';
  }

  /**
   * Builds the form given an optional inboundOrder to build the form from
   * @param purchaseOrder the optional inboundOrder
   */
  public buildPurchaseOrderForm(purchaseOrder?: PurchaseOrder): void {
    this.purchaseOrderForm = this.formBuilder.group({
      purchaseOrderState: [purchaseOrder ? Number.isInteger(purchaseOrder.purchaseOrderState) ? purchaseOrder.purchaseOrderState : PurchaseOrderState.Open : PurchaseOrderState.Open, Validators.required],
      orderDate: [purchaseOrder?.orderDate ? purchaseOrder.orderDate : new Date(), Validators.required],
      deliveryDate: [purchaseOrder?.deliveryDate ? purchaseOrder.deliveryDate : new Date(), Validators.required],
      addressLine: [purchaseOrder?.addressLine ? purchaseOrder.addressLine : '', Validators.required],
      postalCode: [purchaseOrder?.postalCode ? purchaseOrder.postalCode : '', Validators.required],
      city: [purchaseOrder?.city ? purchaseOrder.city : '', Validators.required],
      country: [purchaseOrder?.country ? purchaseOrder.country : '', Validators.required],
      customerFirstName: [purchaseOrder?.customerFirstName ? purchaseOrder.customerFirstName : '', Validators.required],
      customerLastName: [purchaseOrder?.customerLastName ? purchaseOrder.customerLastName : '', Validators.required],
      customerPhone: [purchaseOrder?.customerPhone ? purchaseOrder.customerPhone : '', Validators.required],
      customerEmail: [purchaseOrder?.customerEmail ? purchaseOrder.customerEmail : '', Validators.required],
      totalPrice: [purchaseOrder?.totalPrice ? purchaseOrder.totalPrice : 0, Validators.required],
    });
  }

  /**
   * The Submit of the item form
   */
  public submitPurchaseOrder(): void {
    const purchaseOrder = this.purchaseOrderForm?.value as PurchaseOrder;

    if (purchaseOrder == null) {
      this.messageService.show('Fejl: Kunde ordre må ikke være nul');
      return;
    }

    purchaseOrder.orderLines = this.orderLines.data;

    if (this.purchaseOrderForm?.valid == false) {
      this.messageService.show('Fejl: Kunde ordre formen indeholder fejl');
      return;
    }

    if (this.editing) {
      purchaseOrder.id = parseInt(this.route.snapshot.params['id']);
      return this.submitEditPurchaseOrder(purchaseOrder);
    }

    return this.submitCreatePurchaseOrder(purchaseOrder);
  }

  /**
   * Edits a purchaseOrder
   * @param purchaseOrder the purchaseOrder to edit
   */
  public submitEditPurchaseOrder(purchaseOrder: PurchaseOrder): void {
    this.orderService.editPurchaseOrder(purchaseOrder).subscribe(purchaseOrder => {
      this.buildPurchaseOrderForm(purchaseOrder);
      this.messageService.show('Bestillings ordre redigeret');
    }, error => {
      this.messageService.showError(error);
    });
  }

  /**
   * Creates a purchaseOrder
   * @param purchaseOrder the purchaseOrder to create
   */
  public submitCreatePurchaseOrder(purchaseOrder: PurchaseOrder): void {
    this.orderService.createPurchaseOrder(purchaseOrder).subscribe(inboundOrder => {
      this.router.navigate(['/warehouse/edit-inbound-order/' + inboundOrder.id]);
      this.messageService.show('Bestillings ordre oprettet');
    }, error => {
      this.messageService.showError(error);
    });
  }

  /**
   * Deletes an inboundOrder
   */
  public deleteInboundOrder(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.orderService.deleteOrder(id).subscribe(res => {
      if (!res) {
        this.messageService.show('Der gik noget galt da Bestillings ordre blev forsøgt slettet');
        this.loading = false;
        return;
      }

      this.messageService.show('Produkt slettet');
      this.location.back();
      this.loading = false;
    });
  }

  protected readonly PurchaseOrderState = PurchaseOrderState;
  protected readonly ItemType = ItemType;
}
