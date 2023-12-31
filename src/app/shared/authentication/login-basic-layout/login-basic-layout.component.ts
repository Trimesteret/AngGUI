import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login-basic-layout',
  templateUrl: './login-basic-layout.component.html',
  styleUrls: ['./login-basic-layout.component.scss']
})
export class LoginBasicLayoutComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() loading = false;
  @Input() page = '';

  @Output() submitAuth = new EventEmitter();

  loggedIn = false;

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logger ud...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    }, error => {
      this.messageService.showError(error);
      window.location.reload();
    });
  }
}
