import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';
import { authGuard } from '../guards/auth.guard';
import { roleGuard } from '../guards/role.guard';
import { Role } from '../shared/enums/role';
import { BrowseItemsComponent } from './browse-items/browse-items.component';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { CreateEditItemComponent } from './create-edit-item/create-edit-item.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateEditEnumComponent } from './create-edit-enum/create-edit-enum.component';
import { BrowseSuppliersComponent } from './browse-suppliers/browse-suppliers.component';
import { CreateEditSupplierComponent } from './create-edit-supplier/create-edit-supplier.component';

const routes: Routes = [
  { path: 'createInboundOrder', component: CreateInboundOrderComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'browse-items', component: BrowseItemsComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'browse-suppliers', component: BrowseSuppliersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'browse-users', component: BrowseUsersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'edit-user/:id', component: CreateEditUserComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-supplier', component: CreateEditSupplierComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'edit-supplier/:id', component: CreateEditSupplierComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-user', component: CreateEditUserComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-item', component: CreateEditItemComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'edit-item/:id', component: CreateEditItemComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'edit-enum/:id', component: CreateEditEnumComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-enum', component: CreateEditEnumComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'settings', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
