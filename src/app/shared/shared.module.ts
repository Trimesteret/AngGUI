import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyValuePipe } from './pipes/key-value.pipe';


@NgModule({
  declarations: [
    KeyValuePipe
  ],
  exports: [
    KeyValuePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
