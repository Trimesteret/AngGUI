import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { PurchaseOrder } from '../../../shared/models/purchase-order';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent {
  @Input() loggedIn = false;

  isEmployee = false;
  isTablet: boolean;
  currentPurchaseOrder: PurchaseOrder;

  @Output() logOutEvent = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService,
              private orderService: OrderService) {
    this.isTablet = breakpointObserver.isMatched(Breakpoints.Handset);

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isTablet = result.matches;
      });

    this.isEmployee = this.authenticationService.isEmployee();

    this.currentPurchaseOrder = this.orderService.getCurrentPurchaseOrder();
  }


  public logout(): void{
    this.logOutEvent.emit();
  }
}
