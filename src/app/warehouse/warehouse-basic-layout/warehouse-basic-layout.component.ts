import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-warehouse-basic-layout',
  templateUrl: './warehouse-basic-layout.component.html',
  styleUrls: ['./warehouse-basic-layout.component.scss']
})
export class WarehouseBasicLayoutComponent {
  @Output() logOutEvent = new EventEmitter();


  public logout(): void{
    this.logOutEvent.emit();
  }
}
