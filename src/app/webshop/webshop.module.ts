import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { ItemDisplayComponent } from './item-display/item-display.component';
import { MatButtonModule } from '@angular/material/button';
import { BasketComponent } from './basket/basket.component';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CheckoutComponent,
    CatalogueComponent,
    ItemDisplayComponent,
    BasketComponent
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
    MatButtonModule,
    SharedModule,
    MatSortModule,
    NgOptimizedImage,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class WebshopModule { }
