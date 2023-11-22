import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WebshopRoutingModule } from './webshop-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FrontModule } from './front-pages/front.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    HomePageComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatToolbarModule,
    FrontModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatTableModule
  ]
})
export class WebshopModule { }
