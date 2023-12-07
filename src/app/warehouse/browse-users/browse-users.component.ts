import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/authentication/user.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Role } from '../../shared/enums/role';
import { UserStandardDto } from '../../shared/models/user-standard-dto';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss']
})
export class BrowseUsersComponent implements AfterViewInit{
  loading = true;
  users: MatTableDataSource<UserStandardDto>;

  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'role'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private messageService: MessageService, private authenticationService: AuthenticationService,
              private router: Router) {
  }

  public ngAfterViewInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = new MatTableDataSource(users);
      this.loading = false;
      this.users.paginator = this.paginator;
    });
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  public editUser(userId: number): void {
    this.router.navigate([`/warehouse/edit-user/${userId}`]);
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

  protected readonly Role = Role;
}
