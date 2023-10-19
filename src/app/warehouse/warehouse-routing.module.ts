import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

const routes: Routes = [
  { path: 'createInboundOrder', component: CreateInboundOrderComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
