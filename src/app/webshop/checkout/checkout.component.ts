import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  checkoutForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    email: new FormControl(''),
    deliveryMethod: new FormControl(''),
    postcode: new FormControl(''),
    termsCheckbox: new FormControl(''),
    newsletterCheckbox: new FormControl('')
  });

  goToPayment():void{
    console.log("Hello Uniconta, please help :(");
  }
  createCheckout():void{
    console.log(this.checkoutForm.value);
  }
}
