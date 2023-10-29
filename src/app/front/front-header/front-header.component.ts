import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent {
  @Input() loggedIn = false;

  @Output() logOutEvent = new EventEmitter();

  public logout(): void{
    this.logOutEvent.emit();
  }
}
