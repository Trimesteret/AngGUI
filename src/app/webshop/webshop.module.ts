import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WebshopRoutingModule } from './webshop-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FrontModuleModule } from '../front/front.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from "@angular/material/checkbox";


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
        MatIconModule,
        MatToolbarModule,
        MatToolbarModule,
        FrontModuleModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule
    ]
})
export class WebshopModule { }
