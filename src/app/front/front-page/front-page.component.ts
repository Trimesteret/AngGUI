import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  public loggedIn = false;
  public loading = false;

  constructor(public router: Router, private authenticationService: AuthenticationService) {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  public logout(): void{
    this.loading = true;
    this.authenticationService.logOut();
  }
}
