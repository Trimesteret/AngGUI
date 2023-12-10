import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { PurchaseOrder } from '../../models/purchase-order';
import { OrderLineDto } from '../../interfaces/order-line-dto';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';
import { InboundOrder } from '../../models/inbound-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentPurchaseOrder: PurchaseOrder;

  url = environment.apiUrl + '/order';

  constructor(private http: HttpClient, private cookieService: CookieService, private messageService: MessageService) { }

  /**
   * Gets all inbound orders
   */
  public getAllInboundOrders(): Observable<InboundOrder[]>{
    return this.http.get<InboundOrder[]>(this.url);
  }

  /**
   * Gets all purchase orders
   */
  public getAllPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.url);
  }

  /**
   * Gets the currently active purchase order
   */
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

  /**
   * Adds an order line to the current purchase order
   * @param orderLine the orderLine to add
   */
  public addOrderLineToCurrentPurchaseOrder(orderLine: OrderLineDto): void {
    this.currentPurchaseOrder = this.getCurrentPurchaseOrder();
    const existingOrderLine = this.currentPurchaseOrder.orderLines.find(old => old.itemId == orderLine.itemId);
    if(existingOrderLine != null) {
      existingOrderLine.quantity += orderLine.quantity;
      existingOrderLine.linePrice = existingOrderLine.item.price * existingOrderLine.quantity;
      this.messageService.show('Tilføjet antal: ' + orderLine.quantity + ' af produkt: ' + orderLine.item.name + ' til kurven');
      return;
    }
    orderLine.linePrice = orderLine.item.price * orderLine.quantity;
    this.currentPurchaseOrder.orderLines.push(orderLine);
    this.messageService.show('Tilføjet antal: ' + orderLine.quantity + ' af produkt: ' + orderLine.item.name + ' til kurven');
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
  }

  /**
   * Removes an order line from the current purchase order
   * @param orderLine the orderLine to remove
   */
  public removeOrderLineFromCurrentPurchaseOrder(orderLine: OrderLineDto): void {
    this.currentPurchaseOrder = this.getCurrentPurchaseOrder();
    this.currentPurchaseOrder.orderLines = this.currentPurchaseOrder.orderLines.filter(old => old.itemId != orderLine.itemId);
    this.messageService.show('Fjernede produkt: ' + orderLine.item.name + ' fra kurven');
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
  }

  /**
   * Resets the current purchase order
   */
  public resetCurrentPurchaseOrder(): void {
    this.currentPurchaseOrder = new PurchaseOrder();
    this.cookieService.set('purchaseOrder', JSON.stringify(this.currentPurchaseOrder));
    this.messageService.show('Kurv ryddet');
  }
}
