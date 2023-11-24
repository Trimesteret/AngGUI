import { Component } from '@angular/core';
import { UserService } from '../../shared/services/authentication/user.service';

@Component({
  selector: 'app-create-edit-users',
  templateUrl: './create-edit-users.component.html',
  styleUrls: ['./create-edit-users.component.scss']
})
export class CreateEditUsersComponent {


  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
    });
  }
}
