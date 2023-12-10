import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { WarehouseBasicLayoutComponent } from './warehouse-basic-layout/warehouse-basic-layout.component';
import { WarehouseHeaderComponent } from './warehouse-header/warehouse-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FrontModule } from '../webshop/front-pages/front.module';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { BrowseItemsComponent } from './browse-items/browse-items.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { CreateEditItemComponent } from './create-edit-item/create-edit-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SettingsComponent } from './settings/settings.component';
import { CreateEditEnumComponent } from './create-edit-enum/create-edit-enum.component';
import { BrowseSuppliersComponent } from './browse-suppliers/browse-suppliers.component';
import { CreateEditSupplierComponent } from './create-edit-supplier/create-edit-supplier.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InboundOrdersComponent } from './inbound-orders/inbound-orders.component';

@NgModule({
  declarations: [
    CreateInboundOrderComponent,
    BrowseItemsComponent,
    WarehouseBasicLayoutComponent,
    WarehouseHeaderComponent,
    BrowseUsersComponent,
    CreateEditUserComponent,
    CreateEditItemComponent,
    InboundOrdersComponent,
    SettingsComponent,
    CreateEditEnumComponent,
    BrowseSuppliersComponent,
    CreateEditSupplierComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    FlexModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    FrontModule,
    MatSelectModule,
    SharedModule,
    FormsModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-Es' }]
})
export class WarehouseModule { }
