import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WebshopRoutingModule } from './webshop-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FrontModule } from './front-pages/front.module';
import { MatTableModule } from '@angular/material/table';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomePageComponent,
    CheckoutComponent,
    CatalogueComponent
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
    MatTableModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatButtonModule
  ]
})
export class WebshopModule { }
