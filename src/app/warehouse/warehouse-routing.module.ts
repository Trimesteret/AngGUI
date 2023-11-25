import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';
import { CreateEditUsersComponent } from './create-edit-users/create-edit-users.component';

const routes: Routes = [
  { path: 'createInboundOrder', component: CreateInboundOrderComponent },
  { path: 'create-edit-items', component: CreateItemComponent },
  { path: 'create-edit-users', component: CreateEditUsersComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
