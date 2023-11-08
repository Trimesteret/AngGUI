import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoginDto } from '../models/login-dto';

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
    this.authService.login(this.loginForm.value as LoginDto).subscribe(authRes =>{
      this.cookieService.set('jwtToken', authRes.token );
      this.loading = false;
      this.router.navigate(['/warehouse']);
    },
    error => {
      this.loading = false;
      console.error(error);
    });
  }
}
