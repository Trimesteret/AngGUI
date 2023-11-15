import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  public loggedIn = false;
  public loading = false;

  constructor(public router: Router, private authenticationService: AuthenticationService, private messageService: MessageService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
