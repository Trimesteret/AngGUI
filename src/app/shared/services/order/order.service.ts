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
      this.messageService.show('Tilføjet antal: ' + orderLine.quantity + ' af produkt: ' + orderLine.item.name + ' til kurven');
      return;
    }
    orderLine.price = orderLine.item.price * orderLine.quantity;
    this.currentPurchaseOrder.orderLines.push(orderLine);
    this.messageService.show('Tilføjet antal: ' + orderLine.quantity + ' af produkt: ' + orderLine.item.name + ' til kurven');
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
  }

  public removeOrderLineFromCurrentPurchaseOrder(orderLine: OrderLineDto): void {
    this.currentPurchaseOrder = this.getCurrentPurchaseOrder();
    this.currentPurchaseOrder.orderLines = this.currentPurchaseOrder.orderLines.filter(old => old.productId != orderLine.productId);
    this.messageService.show('Fjernede produkt: ' + orderLine.item.name + ' fra kurven');
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
  }

  public resetCurrentPurchaseOrder(): void {
    this.currentPurchaseOrder = new PurchaseOrder();
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
    this.messageService.show('Kurv ryddet');
  }
}
