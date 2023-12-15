import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { CreateEditInboundOrderComponent } from './create-edit-inbound-order/create-edit-inbound-order.component';
import { BrowseInboundOrdersComponent } from './browse-inbound-orders/browse-inbound-orders.component';
import { BrowsePurchaseOrdersComponent } from './browse-purchase-orders/browse-purchase-orders.component';
import { CreateEditPurchaseOrdersComponent } from './create-edit-purchase-orders/create-edit-purchase-orders.component';

const routes: Routes = [
  { path: 'browse-items', component: BrowseItemsComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Employee } },
  { path: 'browse-suppliers', component: BrowseSuppliersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'browse-users', component: BrowseUsersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'edit-user/:id', component: CreateEditUserComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-supplier', component: CreateEditSupplierComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'edit-supplier/:id', component: CreateEditSupplierComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-user', component: CreateEditUserComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-item', component: CreateEditItemComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'browse-inbound-orders', component: BrowseInboundOrdersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'browse-purchase-orders', component: BrowsePurchaseOrdersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-inbound-order', component: CreateEditInboundOrderComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'edit-inbound-order/:id', component: CreateEditInboundOrderComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
  { path: 'create-purchase-order', component: CreateEditPurchaseOrdersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Employee } },
  { path: 'edit-purchase-order/:id', component: CreateEditPurchaseOrdersComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: Role.Admin } },
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
