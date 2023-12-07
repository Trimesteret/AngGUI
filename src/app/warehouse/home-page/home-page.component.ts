import { Component } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  loading = false;

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService) {
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logger ud...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
