import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-warehouse-header',
  templateUrl: './warehouse-header.component.html',
  styleUrls: ['./warehouse-header.component.scss']
})
export class WarehouseHeaderComponent {
  isTablet: boolean;

  isAdmin = false;

  @Output() logOutEvent = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService) {
    this.isTablet = breakpointObserver.isMatched(Breakpoints.Handset);

    this.isAdmin = this.authenticationService.isAdmin();

    // Subscribe to the changes in screen size
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isTablet = result.matches;
      });  }


  public logout(): void{
    this.logOutEvent.emit();
  }
}
