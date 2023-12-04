import { Component } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Role } from '../../shared/enums/role';


@Component({
  selector: 'app-picking',
  templateUrl: './picking.component.html',
  styleUrls: ['./picking.component.scss']
})
export class PickingComponent {
  loading = false;
  items = [
    { id: 1, type: 'Red wine' },
    { id: 2, type: 'White wine' },
    { id: 3, type: 'Rosé' },
  ];
  constructor(
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
  ) {
    console.log('filler');
  }

  public logout(): void {
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly Role = Role;
}
