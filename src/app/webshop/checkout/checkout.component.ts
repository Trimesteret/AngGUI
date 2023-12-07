import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderLineDto } from '../../shared/interfaces/order-line-dto';
import { OrderService } from '../../shared/services/order/order.service';
import { OrderLine } from '../../shared/models/order-line';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  checkoutForm: FormGroup | undefined;
  basketContent: OrderLineDto[];
  orderLines: MatTableDataSource<OrderLine> = new MatTableDataSource<OrderLine>();
  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderLines = new MatTableDataSource(this.orderService.getCurrentPurchaseOrder().orderLines);
    this.basketContent = this.getBasketItems();
    this.calculateTotalPrice(this.basketContent);
  }
  ngOnInit() : void {
    this.checkoutForm = this.fb.group({
      'name': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'address': ['', Validators.required],
      'country': ['Danmark', Validators.required],
      'postcode': ['', Validators.required],
      'city': ['', Validators.required],
      'deliveryMethod': ['', Validators.required],
      'termsCheckbox': [false, Validators.required],
      'newsletterCheckbox': [false],
    });
  }

  calculateTotalPrice(orderLines: OrderLineDto[]): number {
    let total = 0;
    orderLines.forEach(function (value : OrderLineDto){
      total += (value.price * value.quantity);
    });
    this.orderService.getCurrentPurchaseOrder().totalPrice = total;
    return total;
  }
  getTotalPrice(): number {
    return this.orderService.getCurrentPurchaseOrder().totalPrice;
  }
  getBasketItems(): OrderLineDto[] {
    return this.orderService.getCurrentPurchaseOrder().orderLines;
  }
  public updateLineQuantity(orderLine: OrderLine): void {
    orderLine.price = Math.round(orderLine.item.price * orderLine.quantity*100)/100;
    orderLine.quantity = Number(orderLine.quantity);
  }
  public goToPayment(): void {
    // Not implemented, should send the order to API
  }
}
