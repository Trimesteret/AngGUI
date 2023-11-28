import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/authentication/user.service';
import { UserStandardDto } from '../../shared/authentication/models/user-standard-dto';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../shared/enums/role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  loading = true;

  userForm: FormGroup | undefined;

  constructor(private authenticationService: AuthenticationService, private messageService: MessageService, private userService: UserService,
              private formBuilder: FormBuilder, private route: ActivatedRoute)
  {
    this.getUserAndBuildForm();
  }

  public getUserAndBuildForm(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((user) => {
      this.buildUserForm(user);
      this.loading = false;
    });
  }

  public getRoles(): string[] {
    return Object.keys(Role).filter(key => isNaN(Number(key)));
  }

  /**
   * Builds the profileForm given a user as start values
   * @param user the start values of the form
   * @private
   */
  private buildUserForm(user: UserStandardDto): void {
    this.userForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      phone: [user.phone, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      role: [Role[user.role], Validators.required],
    });
  }

  /**
   * Is run when the user submits the profileForm
   */
  public submitUser(): void{
    if(!this.userForm?.valid){
      this.messageService.show('Please fill in all required fields');
      return;
    }

    this.loading = true;

    const user = this.userForm.value as UserStandardDto;
    user.id = this.route.snapshot.params['id'];
    console.log(user);

    this.userService.editUser(user).subscribe(() => {
      this.loading = false;
      this.messageService.show('User updated');
    },
    error => {
      this.loading = false;
      this.messageService.showError(error);
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
