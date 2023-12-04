import { Component, Input } from '@angular/core';
import { MessageService } from '../../../shared/services/message.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-front-basic-layout',
  templateUrl: './front-basic-layout.component.html',
  styleUrls: ['./front-basic-layout.component.scss']
})
export class FrontBasicLayoutComponent {
  @Input() loggedIn = false;

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService) { }

  public logout(): void{
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    }, error => {
      this.messageService.showError(error);
      window.location.reload();
    });
  }
}
