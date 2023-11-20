import { AfterViewInit, Componenzt, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MessageService } from '../../../shared/services/message.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements AfterViewInit {

  public loggedIn = false;
  public loading = false;

  public customerPurchaseOrders = new MatTableDataSource([{
    id: 1,
    status: 'received'
  },
  {
    id: 2,
    status: 'send'
  }]);

  public displayedColumns: string[] = ['id', 'status'];

  constructor(public router: Router, private authenticationService: AuthenticationService, private messageService: MessageService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }


  ngAfterViewInit(): void {
    this.customerPurchaseOrders.sort = this.sort;
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
