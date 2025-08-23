import React from 'react';
import CommonTable from '../component/CommonTable';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
            {/* Back Button - top left, outside card */}
            <div className="p-6 bg-white rounded-lg w-full">
                <button
                    className="flex items-center justify-center w-12 h-12 bg-white shadow-md border border-gray-200 rounded-full transition-colors duration-200 z-10"
                    onClick={() => navigate(-1)}
                    title="Back"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-primary text-center">Patient Report</h2>
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
        </div>
    );
};

export default PatientReport;
