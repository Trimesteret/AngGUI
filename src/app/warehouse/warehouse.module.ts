import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CreateItemComponent } from './create-item/create-item.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CreateItemComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatButtonModule
  ]
})
export class WarehouseModule { }
