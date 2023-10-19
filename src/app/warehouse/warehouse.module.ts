import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CreateItemComponent } from './create-item/create-item.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CreateInboundOrderComponent,
    CreateItemComponent
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
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-Es' }]
})
export class WarehouseModule { }