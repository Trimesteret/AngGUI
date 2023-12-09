import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../shared/services/message.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/authentication/user.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { User } from '../../../shared/models/user';
import { LoginDto } from '../../../shared/models/login-dto';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit{
  hide = true;
  hideNew = true;
  showChangePasswordFields = false;
  loggedIn = false;
  loading = true;
  profileForm: FormGroup | undefined;
  public customerPurchaseOrders = new MatTableDataSource<any>();

  public displayedColumns: string[] = ['id', 'status'];

  constructor(public router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private messageService: MessageService, private userService: UserService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  ngOnInit(): void {
    this.getUserAndBuildForm();
  }

  public toggleChangePasswordFields(): void {
    this.showChangePasswordFields = !this.showChangePasswordFields;
  }

  /**
   * Gets the current user logged in and builds the profile form
   */
  public getUserAndBuildForm(): void{
    this.userService.getCurrentUser().subscribe(user => {
      this.buildProfileForm(user);
      this.loading = false;
    });
  }

  /**
   * Builds the profileForm given a user as start values
   * @param user the start values of the form
   * @private
   */
  private buildProfileForm(user: User): void {
    this.profileForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      phone: [user.phone, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      password: [''],
      newPasswordOne: [''],
      newPasswordTwo: [''],
    });
  }

  /**
   * Is run when the user clicks the change password button
   */
  public changePassword(): void{
    const changePasswordDto: LoginDto = {
      email: this.profileForm.get('email').value,
      password: this.profileForm.get('password').value,
      newPasswordOne: this.profileForm.get('newPasswordOne').value,
      newPasswordTwo: this.profileForm.get('newPasswordTwo').value
    };

    this.userService.updateCurrentUserPassword(changePasswordDto).subscribe(() => {
      this.loading = false;
      this.messageService.show('Password updated');
      this.showChangePasswordFields = !this.showChangePasswordFields;
    },
    error => {
      this.loading = false;
      this.messageService.showError(error);
    });

  }

  /**
   * Sort table data given an event
   * @param event the event
   */
  public sortData(event: any): void {
    const data = this.customerPurchaseOrders.data.slice();
    if (!event.active || event.direction === '') {
      this.customerPurchaseOrders.data = data;
      return;
    }

    this.customerPurchaseOrders.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }
  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  /**
   * Is run when the user submits the profileForm
   */
  public submitProfile(): void{
    this.loading = true;

    this.userService.updateCurrentUser(this.profileForm.value as User).subscribe(() => {
      this.loading = false;
      this.messageService.show('Profile updated');
    },
    error => {
      this.loading = false;
      this.messageService.showError(error);
    });
  }
}
