import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  public repeatHide = true;
  public hide = true;
  public loading = false;

  signupForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(7)]]
  });

  constructor(private authenticationService: AuthenticationService, private messageService: MessageService,
    private formBuilder: FormBuilder, private router: Router) {
  }

  /**
   * The submit signup function
   */
  public signup(): void{
    if(!this.signupForm.valid && this.signupForm.get('password')?.value !== this.signupForm.get('repeatPassword')?.value){
      this.messageService.show('Sign up form invalid');
      return;
    }

    const signUpUser = this.signupForm.getRawValue() as User;
    if(!signUpUser){
      this.messageService.show('Sign up form invalid');
      return;
    }

    this.loading = true;
    this.authenticationService.signup(signUpUser).subscribe(() => {
      this.messageService.show('Sign up successful');
      this.loading = false;
      this.router.navigate(['/login']);
    }, error => {
      this.loading = false;
      this.messageService.showError(error);
    });
  }

}
