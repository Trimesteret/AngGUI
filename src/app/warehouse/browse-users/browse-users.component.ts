import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/authentication/user.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../shared/enums/role';
import { UserStandardDto } from '../../shared/models/user-standard-dto';
import { TableColumn } from '../../shared/models/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableColumnType } from '../../shared/enums/table-column-type';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss']
})
export class BrowseUsersComponent{
  users: MatTableDataSource<UserStandardDto>;

  public displayedColumns: TableColumn[] = [
    { key: 'id', value: 'Id' }, { key: 'firstName', value: 'Fornavn' }, { key: 'lastName', value: 'Efternavn' },
    { key: 'email', value: 'Email' }, { key: 'phone', value: 'Telefon nummer' }, { key: 'signedUp', value: 'Oprettet', type: TableColumnType.boolean },
    { key: 'role', value: 'Rolle', type: TableColumnType.enum, enum: Role  }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private messageService: MessageService, private authenticationService: AuthenticationService,
              private router: Router)
  {
    this.userService.getAllUsers().subscribe(users => {
      this.users = new MatTableDataSource<UserStandardDto>(users);
      this.users.paginator = this.paginator;
    });
  }

  public editUser(userId: number): void {
    this.router.navigate([`/warehouse/edit-user/${userId}`]);
  }

  protected readonly Role = Role;
}
