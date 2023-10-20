import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WebshopRoutingModule } from './webshop-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomePageComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatButtonModule
  ]
})
export class WebshopModule { }
