import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export interface DataTableColumn {
  field: string;
  header: string;
  body?: (rowData: any) => React.ReactNode;
  sortable?: boolean;
  style?: React.CSSProperties;
}

export interface CommonDataTableProps {
  value: any[];
  columns: DataTableColumn[];
  rows?: number;
  totalRecords?: number;
  loading?: boolean;
  paginator?: boolean;
  exportable?: boolean;
  onPage?: (event: any) => void;
  onSort?: (event: any) => void;
  sortField?: string;
  sortOrder?: 1 | 0 | -1;
  first?: number;
  lazy?: boolean;
}

const CommonDataTable: React.FC<CommonDataTableProps> = ({
  value,
  columns,
  rows = 10,
  totalRecords,
  loading = false,
  paginator = true,
  exportable = true,
  onPage,
  onSort,
  sortField,
  sortOrder,
  first = 0,
  lazy = false,
}) => {
  let dt = React.useRef<DataTable<any[]>>(null);

  const exportCSV = () => {
    if (dt.current) {
      (dt.current as any).exportCSV();
    }
  };

  return (
    <div className="datatable-advanced-demo">
      {exportable && (
        <Button type="button" icon="pi pi-external-link" label="Export" onClick={exportCSV} className="mb-2" />
      )}
      <DataTable
        ref={dt}
        value={value}
  paginator={paginator}
  rows={rows}
  totalRecords={totalRecords}
  loading={loading}
  onPage={onPage}
  onSort={onSort}
  sortField={sortField}
  sortOrder={sortOrder}
  first={typeof first === 'number' ? first : 0}
  lazy={lazy}
  responsiveLayout="scroll"
  dataKey={columns[0]?.field}
  emptyMessage="No records found."
      >
        {columns.map((col) => (
          <Column key={col.field} {...col} />
        ))}
      </DataTable>
    </div>
  );
};

export default CommonDataTable;
