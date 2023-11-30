import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  checkoutForm: FormGroup | undefined;

  constructor(private fb: FormBuilder) { }
  ngOnInit() : void {
    this.checkoutForm = this.fb.group({
      // Define your form controls here using FormBuilder
      // Example: 'name': [initialValue, [validators]]
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
  deliveryMethods = [
    { value: 'pickup', cost: 0, label: 'Afhentning i Butik' },
    { value: 'postnord', cost: 59, label: 'Postnord Hjemmelevering' },
    { value: 'gls', cost: 59, label: 'GLS' },
    { value: 'dao', cost: 59, label: 'DAO' }
  ];
  // Placeholder. This must be fetched from the actual basket, so a service should probably be made to get that information
  basketContent = [
    { name: 'Ugandisk Vin', price: '200', imageUrl: 'assets/PeanutNoar.jfif' },
    { name: 'God Gammeldags Rødvin', price: '300', imageUrl: 'assets/PeanutNoar.jfif' },
    { name: 'God Gammeldags Rødvin', price: '300', imageUrl: 'assets/PeanutNoar.jfif' },
    { name: 'God Gammeldags Rødvin', price: '300', imageUrl: 'assets/PeanutNoar.jfif' },
    { name: 'God Gammeldags Rødvin', price: '300', imageUrl: 'assets/PeanutNoar.jfif' },
    { name: 'God Gammeldags Rødvin', price: '300', imageUrl: 'assets/PeanutNoar.jfif' },
    { name: 'Viktor Special', price: '15', imageUrl: 'assets/PeanutNoar.jfif' }
  ];
  createCheckout():void{
    console.log(this.checkoutForm);
  }
  goToPayment():void{
    console.log('Hello Uniconta, please help :(');
  }
}
