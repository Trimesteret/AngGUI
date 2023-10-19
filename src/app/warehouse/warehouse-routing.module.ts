import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';

const routes: Routes = [
  { path: 'createInboundOrder', component: CreateInboundOrderComponent },
  { path: 'create-item', component: CreateItemComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
