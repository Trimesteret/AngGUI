import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
import { FrontBasicLayoutComponent } from './front-basic-layout/front-basic-layout.component';
import { FrontHeaderComponent } from './front-header/front-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    FrontPageComponent,
    FrontBasicLayoutComponent,
    FrontHeaderComponent,
  ],
  exports: [
    FrontBasicLayoutComponent,
    FrontHeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatToolbarModule,
    FlexModule,
    MatFormFieldModule,
    MatMenuModule,
    ExtendedModule
  ]
})
export class FrontModuleModule { }
