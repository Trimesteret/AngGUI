import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemDisplayComponent } from './item-display/item-display.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'display/:id', component: ItemDisplayComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebshopRoutingModule { }
