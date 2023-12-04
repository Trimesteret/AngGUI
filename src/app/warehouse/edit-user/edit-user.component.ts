import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/authentication/user.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../shared/enums/role';
import { Location } from '@angular/common';
import { UserStandardDto } from '../../shared/models/user-standard-dto';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  loading = true;

  userForm: FormGroup | undefined;

  constructor(private authenticationService: AuthenticationService, private messageService: MessageService, private userService: UserService,
              private formBuilder: FormBuilder, private route: ActivatedRoute, private location: Location)
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

  public deleteUser(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.userService.deleteUser(id).subscribe(res => {
      if(!res) {
        this.messageService.show('Something went wrong deleting this user');
        this.loading = false;
        return;
      }

      this.messageService.show('User deleted');
      this.location.back();
      this.loading = false;
    });
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
      role: [user.role, Validators.required],
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
      this.buildUserForm(user);
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

  protected readonly Role = Role;
}
