import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebshopRoutingModule { }
