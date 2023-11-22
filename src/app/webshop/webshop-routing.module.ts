import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: '', component: CatalogueComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebshopRoutingModule { }
