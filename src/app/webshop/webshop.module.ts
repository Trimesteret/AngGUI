import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WebshopRoutingModule } from './webshop-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FrontModuleModule } from '../front/front.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    HomePageComponent,
    CheckoutComponent,
    CatalogueComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatToolbarModule,
    FrontModuleModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    FormsModule
  ]
})
export class WebshopModule { }
