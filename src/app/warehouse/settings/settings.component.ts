import { Component, ViewChild } from '@angular/core';
import { CustomEnum } from '../../shared/enums/custom-enum';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { EnumService } from '../../shared/services/enum.service';
import { EnumType } from '../../shared/enums/enum-type';
import { TableColumn } from '../../shared/models/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent{
  customEnums: MatTableDataSource<CustomEnum>;

  displayedColumns: TableColumn[] = [{ key: 'id', value: 'id' }, { key: 'key', value: 'Engelsk navn' }, { key: 'value', value: 'Dansk navn' }];

  selectedEnumType: EnumType = EnumType.suitableFor;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private enumService: EnumService, private router: Router) {
    this.selectedEnumType = EnumType.suitableFor;
    this.getAllEnumsByType();
  }

  public getAllEnumsByType(): void {
    this.enumService.getAllCustomEnumsByType(this.selectedEnumType).subscribe(customEnums => {
      this.customEnums = new MatTableDataSource<CustomEnum>(customEnums);
      this.customEnums.paginator = this.paginator;
    });
  }

  public editEnum(id: number): void {
    this.router.navigate(['/warehouse/edit-enum', id]);
  }

  protected readonly EnumType = EnumType;
}
