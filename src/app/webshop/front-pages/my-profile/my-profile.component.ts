import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../shared/services/message.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/authentication/user.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit{

  loggedIn = false;
  loading = true;

  profileForm: FormGroup | undefined;

  public customerPurchaseOrders = new MatTableDataSource([{
    id: 1,
    status: 'received'
  },
  {
    id: 2,
    status: 'send'
  },
  {
    id: 3,
    status: 'abe'
  },
  {
    id: 0,
    status: 'kat'
  }]);

  public displayedColumns: string[] = ['id', 'status'];

  constructor(public router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private messageService: MessageService, private userService: UserService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  ngOnInit(): void {
    this.getUserAndBuildForm();
  }

  /**
   * Gets the current user logged in and builds the profile form
   */
  public getUserAndBuildForm(): void{
    this.userService.getCurrentUser().subscribe(user => {
      this.buildProfileForm(user);
      this.loading= false;
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
      password: [user.password, [Validators.required, Validators.minLength(7)]],
    });
  }

  /**
   * Sort table data given an event
   * @param event the event
   */
  public sortData(event: any): void {
    const data = this.customerPurchaseOrders.data.slice(); // Make a copy of the data array
    if (!event.active || event.direction === '') {
      this.customerPurchaseOrders.data = data; // Default to unsorted data
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
    if(!this.profileForm?.valid){
      this.messageService.show('Please fill in all required fields');
      return;
    }

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

  /**
   * Logs out the user
   */
  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
