import { Component } from '@angular/core';
import { UserService } from '../../shared/services/authentication/user.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-create-edit-users',
  templateUrl: './create-edit-users.component.html',
  styleUrls: ['./create-edit-users.component.scss']
})
export class CreateEditUsersComponent {
  loading = false;

  constructor(private userService: UserService, private messageService: MessageService, private authenticationService: AuthenticationService) {
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
    });
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
