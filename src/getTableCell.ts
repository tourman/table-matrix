interface GetTableCellBasicOptions {
  table: HTMLTableElement;
  rowIndex: number;
  columnIndex: number;
}

interface GetTableCellWithSelector<T> {
  selector: <T>(cell: HTMLTableCellElement) => T;
}

const identity = <V>(value: V): V => value;

export function getTableCell(
  tableOrOptions: HTMLTableElement | GetTableCellBasicOptions
): HTMLTableCellElement;
export function getTableCell<T>(
  options: GetTableCellBasicOptions & GetTableCellWithSelector<T>
): T;
export function getTableCell<T>(
  tableOrOptions:
    | HTMLTableElement
    | (GetTableCellBasicOptions & Partial<GetTableCellWithSelector<T>>)
): T | HTMLTableCellElement {
  const table =
    tableOrOptions instanceof HTMLTableElement
      ? tableOrOptions
      : tableOrOptions.table;
  const selector =
    (!(tableOrOptions instanceof HTMLTableElement) &&
      tableOrOptions.selector) ||
    identity;
  return selector(table.querySelector('td') ?? document.createElement('td'));
}
