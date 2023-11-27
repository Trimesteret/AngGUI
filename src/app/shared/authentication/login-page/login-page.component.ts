import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../models/login-dto';
import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  hide = true;

  loading = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]]
  });

  constructor(private authService: AuthenticationService, private messageService: MessageService, private router: Router,
              private formBuilder: FormBuilder) {
  }

  /**
   * The submit login function
   */
  public login(): void{
    this.loading = true;
    this.authService.login(this.loginForm.value as LoginDto).subscribe(() => {
      this.loading = false;
      this.router.navigate(['']);
    },
    error => {
      this.loading = false;
      this.messageService.showError(error);
      console.error(error);
    });
  }
}
