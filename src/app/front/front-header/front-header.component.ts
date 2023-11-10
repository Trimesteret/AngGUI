import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent {
  @Input() loggedIn = false;

  isTablet: boolean;

  @Output() logOutEvent = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isTablet = breakpointObserver.isMatched(Breakpoints.Handset);

    // Subscribe to the changes in screen size
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isTablet = result.matches;
      });  }


  public logout(): void{
    this.logOutEvent.emit();
  }
}
