import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  public loading = false;

  signupForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]]
  });

  constructor(private authenticationService: AuthenticationService, private messageService: MessageService,
    private formBuilder: FormBuilder) {
  }

  public signup(): void{
    if(!this.signupForm.valid){
      this.messageService.show('Sign up form invalid');
      return;
    }

    const signUpUser = this.mapFormToUser();
    if(!signUpUser){
      this.messageService.show('Sign up form invalid');
      return;
    }

    this.loading = true;
    this.authenticationService.signup(signUpUser).subscribe(authRes => {
      console.log(authRes);
    }, error => {
      this.loading = false;
      this.messageService.showError(error);
    });
  }

  private mapFormToUser(): User | null{
    let user = null;
    try {
      const formValue = this.signupForm.value;
      user = {
        firstName: String(formValue.firstName),
        lastName: String(formValue.lastName),
        email: String(formValue.email),
        password: String(formValue.password),
        phone: formValue.phone ? Number.parseInt(formValue.phone) : null, // Convert phone to a number or null
      } as User;

      if(!user.phone){
        user = null;
      }
    }catch (e){
      this.messageService.show(e as string);
    }
    return user;
  }
}
