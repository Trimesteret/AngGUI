import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationPass } from '../models/authentication-pass';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public hide = true;

  public loading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ]),
  });

  constructor(private authService: AuthenticationService, private cookieService: CookieService, private router: Router) {
  }

  public login(): void{
    this.loading = true;
    this.authService.login(this.loginForm.value as AuthenticationPass).subscribe(authRes =>{
      this.cookieService.set('token', authRes.token, { expires: authRes.tokenExpiration });
      this.loading = false;
      this.router.navigate(['/warehouse']);
    },
    error => {
      this.loading = false;
      console.error(error);
    });
  }
}
