import { Component } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/authentication/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../shared/enums/role';
import { Location } from '@angular/common';
import { UserStandardDto } from '../../shared/models/user-standard-dto';


@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent {
  loading = true;
  editing = false;
  userForm: FormGroup | undefined;

  constructor(private messageService: MessageService, private userService: UserService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private location: Location, private router: Router)
  {
    this.getUserAndBuildForm();
  }

  public getUserAndBuildForm(): void {
    let id = null;
    const idString = this.route.snapshot.params['id'];

    id = parseInt(idString);

    if(!Number.isInteger(id)) {
      this.buildUserForm();
      this.editing = false;
      this.loading = false;
      return;
    }

    this.userService.getUserById(id).subscribe((user) => {
      this.buildUserForm(user);
      this.editing = true;
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
  private buildUserForm(user?: UserStandardDto): void {
    this.userForm = this.formBuilder.group({
      firstName: [user?.firstName ? user?.firstName : '', Validators.required],
      lastName: [user?.lastName ? user?.lastName : '', Validators.required],
      phone: [user?.phone ? user?.phone : '', Validators.required],
      email: [user?.email ? user?.email : '', [Validators.required, Validators.email]],
      role: [Number.isInteger(user?.role) ? user?.role : Role.Customer, Validators.required],
    });
  }

  /**
   * The Submit of the user form
   */
  public submitUser(): void {
    const user = this.userForm?.value as UserStandardDto;

    if(user == null){
      this.messageService.show('Fejl: Bruger må ikke være nul');
      return;
    }

    if(this.userForm?.valid == false){
      this.messageService.show('Fejl: Bruger formen indeholder fejl');
      return;
    }

    if (this.editing) {
      user.id = parseInt(this.route.snapshot.params['id']);
      return this.submitEditUser(user);
    }

    return this.submitCreateUser(user);
  }

  /**
   * Edits an user given an userDto
   * @param user
   */
  public submitEditUser(user: UserStandardDto): void {
    this.userService.editUser(user).subscribe(user => {
      this.buildUserForm(user);
      this.messageService.show('Bruger redigeret');
    }, error => {
      this.messageService.showError(error);
    });
  }

  /**
   * Creates a user given a userDto
   * @param user
   */
  public submitCreateUser(user: UserStandardDto): void{
    this.userService.createUser(user).subscribe(user => {
      this.router.navigate(['/warehouse/edit-user/' + user.id]);
      this.messageService.show('Bruger oprettet');
    }, error => {
      this.messageService.showError(error);
    });
  }

  protected readonly Role = Role;
}
