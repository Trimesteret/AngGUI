import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../shared/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/authentication/user.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { User } from '../../../shared/models/user';
import { LoginDto } from '../../../shared/models/login-dto';
import { TableColumn } from '../../../shared/models/table-column';
import { TableColumnType } from '../../../shared/enums/table-column-type';
import { PurchaseOrder } from '../../../shared/models/purchase-order';
import { Observable } from 'rxjs';
import { OrderService } from '../../../shared/services/order/order.service';
import { MatTableDataSource } from '@angular/material/table';

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

  purchaseOrders: MatTableDataSource<PurchaseOrder>;
  displayedColumns: TableColumn[] = [
    { key: 'id', value: 'Id' }, { key: 'purchaseOrderState', value: 'Ordre status' }, { key: 'orderDate', value: 'Ordre dato', type: TableColumnType.date },
    { key: 'deliveryDate', value: 'Leverings dato', type: TableColumnType.date }, { key: 'totalPrice', value: 'Total pris' }
  ];

  constructor(public router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private messageService: MessageService, private userService: UserService, private orderService: OrderService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
    this.orderService.getCurrentUserPurchaseOrders().subscribe(purchaseOrders => {
      this.purchaseOrders = new MatTableDataSource<PurchaseOrder>(purchaseOrders);
    });
  }

  public ngOnInit(): void {
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
      this.messageService.show('Adgangskode opdateret');
      this.showChangePasswordFields = !this.showChangePasswordFields;
    },
    error => {
      this.loading = false;
      this.messageService.showError(error);
    });

  }

  /**
   * Is run when the user submits the profileForm
   */
  public submitProfile(): void{
    this.loading = true;

    this.userService.updateCurrentUser(this.profileForm.value as User).subscribe(() => {
      this.loading = false;
      this.messageService.show('Profil opdateret');
    },
    error => {
      this.loading = false;
      this.messageService.showError(error);
    });
  }
}
