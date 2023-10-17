import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { CreateInboundOrderComponent } from './create-inbound-order/create-inbound-order.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CreateInboundOrderComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
