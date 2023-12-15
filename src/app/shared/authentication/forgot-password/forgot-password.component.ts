import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ForgotPasswordDto } from '../../models/forgot-password-dto';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public loading = false;

  forgotForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(private authenticationService: AuthenticationService, private messageService: MessageService) {
  }

  public forgotPassword(): void{
    if(!this.forgotForm.valid){
      return this.messageService.show('Please fill in a valid email address');
    }

    const forgotPasswordDto = this.forgotForm.value as ForgotPasswordDto;
    this.authenticationService.forgotPassword(forgotPasswordDto).subscribe(res => {
      console.log(res.newPassword);
      this.messageService.show('Your new password is ' + res.newPassword);
    });
  }
}
