import React from 'react';
import CommonTable from '../component/CommonTable';
import { useNavigate } from 'react-router-dom';

const mockReports = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    test: `Test ${i + 1}`,
    result: i % 2 === 0 ? 'Normal' : 'Abnormal',
    value: `${Math.round(Math.random() * 100)}`,
    unit: 'mg/dL',
}));

const PatientReport: React.FC = () => {
    const navigate = useNavigate();

    const columns: any[] = [
        { field: 'id', header: 'Report ID', sortable: true },
        { field: 'test', header: 'Test', sortable: true },
        { field: 'result', header: 'Result', sortable: true },
        { field: 'value', header: 'Value', sortable: true },
        { field: 'unit', header: 'Unit', sortable: true },
    ];

    return (
        <div className="p-6 bg-white rounded-lg">
            <button
                className="mb-4 px-4 py-2 bg-primary text-accent font-bold rounded hover:bg-yellow-300"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            <h2 className="text-2xl font-bold mb-4 text-primary">Patient Report</h2>
            <CommonTable
                value={mockReports}
                columns={columns}
                rows={5}
                totalRecords={5}
                loading={false}
                paginator={false}
                exportable={true}
            />
        </div>
    );
};

export default PatientReport;
