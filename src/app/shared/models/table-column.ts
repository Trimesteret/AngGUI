import { TableColumnType } from '../enums/table-column-type';

export interface TableColumn {
  key: string;
  value: string;
  type?: TableColumnType;
}
