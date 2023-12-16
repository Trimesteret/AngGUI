import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../../models/table-column';
import { TableColumnType } from '../../enums/table-column-type';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements AfterViewInit {
  @Input() tableData: MatTableDataSource<any>;
  @Input() displayedColumns: TableColumn[];
  @Input() showSearchField = true;
  @Input() addDeleteButton = false;

  loading = true;

  @Output() lineClickId = new EventEmitter<number>();
  @Output() deleteClickId = new EventEmitter<number>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    if (this.addDeleteButton) {
      this.displayedColumns.push({ key: 'delete', value: 'Slet', type: TableColumnType.delete });
    }

    this.loading = false;
  }

  public lineClick(id: number): void {
    this.lineClickId.emit(id);
  }

  public deleteClick(id: number): void {
    this.deleteClickId.emit(id);
  }

  public getColumnNames(): string[] {
    return this.displayedColumns.map(column => column.key);
  }

  public applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  public sortData(event: any): void {
    const data = this.tableData.data.slice();
    if (!event.active || event.direction === '') {
      this.tableData.data = data;
      return;
    }

    this.tableData.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      return this.compare(a[event.active], b[event.active], isAsc);
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  protected readonly TableColumnType = TableColumnType;
}
