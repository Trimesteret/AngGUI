import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderLineDto } from '../../shared/interfaces/order-line-dto';
import { OrderService } from '../../shared/services/order/order.service';
import { PurchaseOrder } from '../../shared/models/purchase-order';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent{
  checkoutForm: FormGroup;
  purchaseOrder: PurchaseOrder;
  deliveryPrice = 0;
  loggedIn = false;

  deliveryMethods = [
    {
      id: 1,
      name: 'Afhent i butik',
      price: 0
    },
    {
      id: 2,
      name: 'PostNord',
      price: 59
    }, {
      id: 3,
      name: 'GLS',
      price: 49
    }, {
      id: 4,
      name: 'DAO',
      price: 39
    }, {
      id: 5,
      name: 'Bring',
      price: 79
    }];

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private authenticationService: AuthenticationService,
              private messageService: MessageService) {
    this.purchaseOrder = this.orderService.getCurrentPurchaseOrder();
    this.buildCheckOutForm();

    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  /**
   * Builds the checkout form
   */
  public buildCheckOutForm(): void {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', Validators.required]
      }),
      address: this.formBuilder.group({
        addressLine: ['', Validators.required],
        country: ['Danmark', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
      }),
      deliveryMethod: ['', Validators.required],
      termsCheckbox: [false, Validators.required],
      newsletterCheckbox: [false],
    });

    this.checkoutForm.get('deliveryMethod').valueChanges.subscribe((value) => {
      this.deliveryPrice = value[0].price;
    });
  }

  /**
   * Gets the total price of the order by adding all the prices of the orderlines
   */
  public getCalculatedTotalPrice(): number {
    let total = 0;
    this.purchaseOrder = this.orderService.getCurrentPurchaseOrder();
    this.purchaseOrder.orderLines.forEach(function (orderLine : OrderLineDto){
      total += orderLine.linePrice;
    });
    return total;
  }

  /**
   * Gets the total price of the order by adding all the prices of the orderlines and the delivery price
   */
  public getCalculatedTotalPriceWithDelivery(): number {
    return this.getCalculatedTotalPrice() + this.deliveryPrice;
  }

  /**
   *
   */
  public goToPayment(): void {
    if(this.checkoutForm.invalid || !this.checkoutForm.get('termsCheckbox').value) {
      this.messageService.show('Udfyld venligst alle felterne og accepter handelsbetingelserne');
      return;
    }

    const purchaseOrder = this.checkoutForm.value as PurchaseOrder;
    purchaseOrder.orderLines = this.purchaseOrder.orderLines;
    purchaseOrder.orderDate = new Date();
    console.log(purchaseOrder);
    this.orderService.createPurchaseOrder(purchaseOrder).subscribe((response) => {
      console.log(response);
      /** Reroute to webshop page **/
    });
  }
}
