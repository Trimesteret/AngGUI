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


  // Placeholder. This must be fetched from the actual basket, so a service should probably be made to get that information
  basketContent = [
    {name: 'Inshallah', price: '200', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'Viktor Special', price: '15', imageUrl: "assets/PeanutNoar.jfif"}
    ];
  goToPayment():void{
    console.log('Hello Uniconta, please help :(');
  }

  // Should probably be in a basket/item service
  calculateTotalPrice(basketContent: { name: string, price: string }[]): number {
    let totalPrice = 0;

    for (const item of basketContent) {
      const itemPrice = parseFloat(item.price);

      if (!isNaN(itemPrice)) {
        totalPrice += itemPrice;
      } else {
        console.error(`Invalid price for item '${item.name}': ${item.price}`);
      }
    }
    return totalPrice;
  }
  createCheckout():void{
    console.log(this.checkoutForm.value);
  }
}
