import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { PurchaseOrder } from '../../models/purchase-order';
import { OrderLineDto } from '../../interfaces/order-line-dto';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentPurchaseOrder: PurchaseOrder;

  url = environment.apiUrl + '/order';

  constructor(private http: HttpClient, private cookieService: CookieService, private messageService: MessageService) { }

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
}
