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
    deliveryMethod: new FormControl('')
  });

  createCheckout():void{
    console.log(this.checkoutForm.value);
  }
}
