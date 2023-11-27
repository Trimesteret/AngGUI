import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemDisplayComponent } from './item-display/item-display.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'item/:id', component: ItemDisplayComponent },
  { path: '', component: CatalogueComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebshopRoutingModule { }
