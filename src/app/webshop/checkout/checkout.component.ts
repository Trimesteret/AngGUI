import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderLineDto } from '../../shared/interfaces/order-line-dto';
import { OrderService } from '../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  checkoutForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, private orderService: OrderService) { }
  basketContent: OrderLineDto[];
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
    this.basketContent = this.getBasketItems();
    this.calculateTotalPrice(this.basketContent);
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
  public goToPayment(): void {
    // Not implemented, should send the order to API
  }
}
