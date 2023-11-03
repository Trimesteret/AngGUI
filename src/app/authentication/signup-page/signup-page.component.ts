import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  public loading = false;

  signupForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
    phone: new FormControl<string>('' , [
      Validators.required
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(7)
    ]),
  });

  constructor(private authenticationService: AuthenticationService) {
  }

  public signup(): void{
    if(!this.signupForm.valid){
      console.log('Sign up form invalid');
      return;
    }

    const signUpUser = this.mapFormToUser();
    if(!signUpUser){
      console.log('Sign up form invalid');
      return;
    }
    this.authenticationService.signup(signUpUser).subscribe(authRes => {
      console.log(authRes);
    }, error => {
      console.error(error);
    });
  }

  private mapFormToUser(): User | null{
    let user = null;
    try {
      const formValue = this.signupForm.value;
      user = {
        name: String(formValue.name),
        email: String(formValue.email),
        password: String(formValue.password),
        phone: formValue.phone ? Number.parseInt(formValue.phone) : null, // Convert phone to a number or null
      } as User;

      if(!user.phone){
        user = null;
      }
    }catch (e){
      console.log(e);
    }
    return user;
  }
}
