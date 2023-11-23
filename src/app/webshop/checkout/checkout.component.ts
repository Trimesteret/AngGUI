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

  deliveryMethods = [
    { value: 'pickup', cost: 0, label: 'Afhentning i Butik' },
    { value: 'postnord', cost: 59, label: 'Postnord Hjemmelevering' },
    { value: 'gls', cost: 59, label: 'GLS' },
    { value: 'dao', cost: 59, label: 'DAO' }
  ];

  addressFields = [
    { title: 'name', placeholder: 'Navn' },
    { title: 'phoneNumber', placeholder: 'Telefon Nummer' },
    { title: 'email', placeholder: 'E-mail' },
    { title: 'address', placeholder: 'Adresse' },
    { title: 'city', placeholder: 'By' },
    { title: 'country', placeholder: 'Land' }
  ];
  goToPayment():void{
    console.log('Hello Uniconta, please help :(');
  }
  createCheckout():void{
    console.log(this.checkoutForm.value);
  }
}
