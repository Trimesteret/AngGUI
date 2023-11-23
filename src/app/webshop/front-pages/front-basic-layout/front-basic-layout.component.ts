import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-front-basic-layout',
  templateUrl: './front-basic-layout.component.html',
  styleUrls: ['./front-basic-layout.component.scss']
})
export class FrontBasicLayoutComponent {
  @Input() loggedIn = false;

  @Output() logOutEvent = new EventEmitter();

  public logout(): void{
    this.logOutEvent.emit();
  }
}
