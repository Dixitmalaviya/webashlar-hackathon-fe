import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    style?: React.CSSProperties;
    body?: (rowData: any, col: TableColumn, rowIndex: number) => React.ReactNode;
}

export interface CommonTableProps {
    value: any[];
    columns: TableColumn[];
    rows?: number;
    totalRecords?: number;
    loading?: boolean;
    paginator?: boolean;
    exportable?: boolean;
    onPage?: (event: any) => void;
    first?: number;
    lazy?: boolean;
}

const CommonTable: React.FC<CommonTableProps> = ({
    value,
    columns,
    rows = 10,
    totalRecords,
    loading = false,
    paginator = true,
    exportable = true,
    onPage,
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
        <>
            <style>{`
                        /* Fixed header for PrimeReact DataTable */
                        .p-datatable-scrollable .p-datatable-thead > tr > th {
                            position: sticky;
                            top: 0;
                            z-index: 2;
                            background: #fff;
                        }
        .p-paginator .p-paginator-pages {
          display: flex !important;
          flex-direction: row !important;
        }
        .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
          background-color: #eff6ff !important;
          color: #3b82f6 !important;
          font-weight: bold;
          border-radius: 9999px;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0.25rem;
          box-shadow: none;
          border: none;
        }
        .p-paginator .p-paginator-pages .p-paginator-page {
          background: transparent;
          color: #374151;
          border-radius: 9999px;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0.25rem;
        }
        .p-datatable-table .p-datatable-scrollable-table{
            border: 1px solid #888888ff;
            border-radius: 0.5rem;
            overflow: hidden;
        }
      `}</style>
            <div className="p-4 rounded-xl">
                <div className="flex justify-end items-center mb-2">
                    {exportable && (
                        <Button type="button" icon="pi pi-external-link" label="Export" onClick={exportCSV} className="bg-primary text-white font-bold px-4 py-2 rounded" />
                    )}
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <DataTable
                            value={Array.from({ length: 10 }) as any[]}
                            tableStyle={{ fontSize: '0.8rem' }}
                            showGridlines
                            scrollable
                            scrollHeight="600px"
                        >
                            <Column
                                header="S.No"
                                body={() => <Skeleton width="2rem" />}
                                style={{ width: '70px' }}
                            />
                            {columns.map((col, idx) => (
                                <Column
                                    key={`skeleton-${idx}`}
                                    header={col.header}
                                    body={() => <Skeleton width="100%" />}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        minWidth: '120px',
                                    }}
                                />
                            ))}
                        </DataTable>
                    ) : (
                        <DataTable
                            ref={dt}
                            value={value}
                            paginator={paginator}
                            rows={rows}
                            totalRecords={totalRecords}
                            loading={loading}
                            onPage={onPage}
                            first={first}
                            lazy={lazy}
                            responsiveLayout="scroll"
                            dataKey={columns[0]?.field}
                            emptyMessage="No records found."
                            className="min-w-full rounded-lg"
                            tableClassName="min-w-full text-sm text-left text-gray-700 font-sans"
                            rowClassName={() => ''}
                            scrollable 
                            scrollHeight="600px"
                            frozenValue={undefined}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            paginatorClassName="!mt-4"
                            pageLinkSize={5}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                            rowsPerPageOptions={[10, 25, 100]}
                        >
                            {columns.map((col) => (
                                <Column
                                    key={col.field}
                                    field={col.field}
                                    header={col.header}
                                    sortable={col.sortable}
                                    style={{ borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', ...col.style }}
                                    body={col.body ? ((rowData: any, options: any) => col.body && col.body(rowData, col, options.rowIndex)) : undefined}
                                    headerStyle={{ color: '#000', fontWeight: 700, borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', ...col.style }}
                                />
                            ))}
                        </DataTable>
                    )}
                </div>
            </div>
        </>
    );
};

export default CommonTable;
