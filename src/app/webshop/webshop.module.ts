import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WebshopRoutingModule } from './webshop-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FrontModuleModule } from '../front/front.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatToolbarModule,
    FrontModuleModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ]
})
export class WebshopModule { }
