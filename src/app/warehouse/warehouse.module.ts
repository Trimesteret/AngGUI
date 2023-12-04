import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
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
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CreateItemComponent } from './create-item/create-item.component';
import { WarehouseBasicLayoutComponent } from './warehouse-basic-layout/warehouse-basic-layout.component';
import { WarehouseHeaderComponent } from './warehouse-header/warehouse-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateEditUsersComponent } from './create-edit-users/create-edit-users.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FrontModule } from '../webshop/front-pages/front.module';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { EditItemComponent } from './edit-item/edit-item.component';
import { OrdersComponent } from './orders/orders.component';
import { PackingComponent } from './packing/packing.component';
import { PickingComponent } from './picking/picking.component';


@NgModule({
  declarations: [
    HomePageComponent,
    CreateInboundOrderComponent,
    CreateItemComponent,
    WarehouseBasicLayoutComponent,
    WarehouseHeaderComponent,
    CreateEditUsersComponent,
    EditUserComponent,
    EditItemComponent,
    OrdersComponent,
    PackingComponent,
    PickingComponent
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
    FormsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-Es' }]
})
export class WarehouseModule { }
