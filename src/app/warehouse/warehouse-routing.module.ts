import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';
import { CreateEditUsersComponent } from './create-edit-users/create-edit-users.component';
import { authGuard } from '../guards/auth.guard';
import { roleGuard } from '../guards/role.guard';
import { Roles } from '../shared/enums/roles';

const routes: Routes = [
  { path: 'createInboundOrder', component: CreateInboundOrderComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Roles.Admin } },
  { path: 'create-edit-items', component: CreateItemComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Roles.Admin } },
  { path: 'create-edit-users', component: CreateEditUsersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Roles.Admin } },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
