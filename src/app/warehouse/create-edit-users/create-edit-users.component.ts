import { Component } from '@angular/core';
import { UserService } from '../../shared/services/authentication/user.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserStandardDto } from '../../shared/authentication/models/user-standard-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-users',
  templateUrl: './create-edit-users.component.html',
  styleUrls: ['./create-edit-users.component.scss']
})
export class CreateEditUsersComponent {
  loading = false;
  users: MatTableDataSource<UserStandardDto> = new MatTableDataSource<UserStandardDto>();

  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'role'];

  constructor(private userService: UserService, private messageService: MessageService, private authenticationService: AuthenticationService,
              private router: Router) {
    this.userService.getAllUsers().subscribe(users => {
      this.users = new MatTableDataSource(users);
    });
  }

  public editUser(userId: number): void {
    this.router.navigate([`/warehouse/user/${userId}`]);
  }

  /**
   * Sort table data given an event
   * @param event the event
   */
  public sortData(event: any): void {
    const data = this.users.data.slice(); // Make a copy of the data array
    if (!event.active || event.direction === '') {
      this.users.data = data; // Default to unsorted data
      return;
    }

    this.users.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'firstName':
          return this.compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return this.compare(a.lastName, b.lastName, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'phone':
          return this.compare(a.phone, b.phone, isAsc);
        case 'role':
          return this.compare(a.role ? a.role.toString() : 0, b.role ? b.role.toString() : 0, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
