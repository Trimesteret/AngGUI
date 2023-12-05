import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { PurchaseOrder } from '../../models/purchase-order';
import { OrderLineDto } from '../../interfaces/order-line-dto';
import { MessageService } from '../message.service';
import { Observable, of } from 'rxjs';
import { UserStandardDto } from '../../models/user-standard-dto';
import { PurchaseOrderDto } from '../../interfaces/purchase-order-dto';
import { PurchaseOrderState } from '../../enums/purchase-order-state';
import { OrderLine } from '../../models/order-line';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentPurchaseOrder: PurchaseOrder;

  url = environment.apiUrl + '/order';

  constructor(private http: HttpClient, private cookieService: CookieService, private messageService: MessageService) { }

  public getAllOrders(): Observable<PurchaseOrderDto[]>{
    /*
    let purchaseOrders:PurchaseOrderDto[] = [{
      purchaseOrderState: PurchaseOrderState.Open,
      id: 0,
      deliveryAddress: 'diller',
      deliveryDate: new Date(),
      orderDate: new Date(),
      totalPrice: 100,
      status: 'nej',
      orderLines: [],
      Supplier: 'Jens hans'},
    ]
    return of(purchaseOrders);
    */

    return this.http.get<PurchaseOrderDto[]>(this.url);
  }
  public getCurrentPurchaseOrder(): PurchaseOrder {
    if(this.currentPurchaseOrder != null) {
      return this.currentPurchaseOrder;
    }

    if(this.cookieService.check('purchaseOrder')) {
      this.currentPurchaseOrder = JSON.parse(this.cookieService.get('purchaseOrder'));
      return this.currentPurchaseOrder;
    }

    this.currentPurchaseOrder = new PurchaseOrder();
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
    return this.currentPurchaseOrder;
  }

  public addOrderLineToCurrentPurchaseOrder(orderLine: OrderLineDto): void {
    this.currentPurchaseOrder = this.getCurrentPurchaseOrder();
    const existingOrderLine = this.currentPurchaseOrder.orderLines.find(old => old.productId == orderLine.productId);
    if(existingOrderLine != null) {
      existingOrderLine.quantity += orderLine.quantity;
      existingOrderLine.price = existingOrderLine.item.price * existingOrderLine.quantity;
      this.messageService.show('Added quantity: ' + orderLine.quantity + ' of product: ' + orderLine.item.name + ' to cart');
      return;
    }
    orderLine.price = orderLine.item.price * orderLine.quantity;
    this.currentPurchaseOrder.orderLines.push(orderLine);
    this.messageService.show('Added quantity: ' + orderLine.quantity + ' of product: ' + orderLine.item.name + ' to cart');
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
  }

  public removeOrderLineFromCurrentPurchaseOrder(orderLine: OrderLineDto): void {
    this.currentPurchaseOrder = this.getCurrentPurchaseOrder();
    this.currentPurchaseOrder.orderLines = this.currentPurchaseOrder.orderLines.filter(old => old.productId != orderLine.productId);
    this.messageService.show('Removed product: ' + orderLine.item.name + ' from cart');
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
  }

  public resetCurrentPurchaseOrder(): void {
    this.currentPurchaseOrder = new PurchaseOrder();
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
    this.messageService.show('Cart cleared');
  }
}
