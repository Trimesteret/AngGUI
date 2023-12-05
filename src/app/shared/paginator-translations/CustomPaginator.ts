import { MatPaginatorIntl } from '@angular/material/paginator';

const danishRangeLabel = (page: number, pageSize: number, length: number) : string => {
  if (length == 0 || pageSize == 0) {
    return `0 af ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;
  const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} af ${length}`;
};
export function CustomPaginator() : MatPaginatorIntl {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Viste elementer per side:';
  customPaginatorIntl.nextPageLabel = 'Næste side';
  customPaginatorIntl.previousPageLabel = 'Sidste side';
  customPaginatorIntl.lastPageLabel = 'Sidste side';
  customPaginatorIntl.firstPageLabel = 'Første side';
  customPaginatorIntl.getRangeLabel = danishRangeLabel;

  return customPaginatorIntl;
}
