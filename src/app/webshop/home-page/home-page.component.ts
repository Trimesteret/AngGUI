import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public loggedIn = false;
  public loading = false;

  constructor(public router: Router, private authenticationService: AuthenticationService) {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  public logout(): void{
    this.authenticationService.logOut();
  }
}
