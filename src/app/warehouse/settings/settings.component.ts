import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomEnum } from '../../shared/enums/custom-enum';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { EnumService } from '../../shared/services/enum.service';
import { EnumType } from '../../shared/enums/enum-type';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit{


  customEnums: MatTableDataSource<CustomEnum>;

  public displayedColumns: string[] = ['id', 'key', 'value'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public selectedEnumType: EnumType;


  constructor(private enumService: EnumService, private messageService: MessageService, private router: Router) {

  }

  public ngAfterViewInit(): void {
    this.enumService.getSuitableForEnums().subscribe(suitableForEnums => {
      this.customEnums = new MatTableDataSource(suitableForEnums);
      this.customEnums.paginator = this.paginator;
    });

    this.selectedEnumType = EnumType.suitableFor;
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customEnums.filter = filterValue.trim().toLowerCase();

    if (this.customEnums.paginator) {
      this.customEnums.paginator.firstPage();
    }
  }

  /**
   * Sort table data given an event
   * @param event the event
   */
  public sortData(event: any): void {
    const data = this.customEnums.data.slice(); // Make a copy of the data array
    if (!event.active || event.direction === '') {
      this.customEnums.data = data; // Default to unsorted data
      return;
    }

    this.customEnums.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.id ? a.id : 0, b.id ? b.id : 0, isAsc);
        case 'key':
          return this.compare(a.key, b.key, isAsc);
        case 'value':
          return this.compare(a.value, b.value, isAsc);
        case 'enumType':
          return this.compare(a.enumType, b.enumType, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  protected readonly EnumType = EnumType;
}
