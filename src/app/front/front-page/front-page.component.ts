import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  public loggedIn = false;
  public loading = false;

  constructor(public router: Router, private authenticationService: AuthenticationService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  public logout(): void{
    this.loading = true;
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
