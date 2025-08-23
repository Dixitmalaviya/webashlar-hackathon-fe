import React, { useEffect, useState, useCallback } from 'react';
import CommonTable from '../component/CommonTable';
import type { TableColumn } from '../component/CommonTable';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
}

const PatientList: React.FC = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(10);

    // Simulate server-side fetch with fallback mock data
    const fetchPatients = useCallback(async (page: number, rows: number) => {
        setLoading(true);
        try {
            // Replace this with your real API endpoint
            const mockData: Patient[] = Array.from({ length: 52 }, (_, i) => ({
                id: i + 1,
                name: `Patient ${i + 1}`,
                age: 20 + ((i + 1) % 30),
                gender: (i % 2 === 0 ? 'Male' : 'Female'),
                email: `patient${i + 1}@example.com`,
                bloodType: (i % 4 === 0 ? 'A+' : i % 4 === 1 ? 'B+' : i % 4 === 2 ? 'AB+' : 'O+'),
            }));
            setPatients(mockData.slice(page, page + rows));
            setTotalRecords(mockData.length);
        } catch (error) {
            // Fallback mock data for demo
            const mockData: Patient[] = Array.from({ length: 52 }, (_, i) => ({
                id: i + 1,
                name: `Patient ${i + 1}`,
                age: 20 + ((i + 1) % 30),
                gender: (i % 2 === 0 ? 'Male' : 'Female'),
                email: `patient${i + 1}@example.com`,
                bloodType: (i % 4 === 0 ? 'A+' : i % 4 === 1 ? 'B+' : i % 4 === 2 ? 'AB+' : 'O+'),
            }));
            setPatients(mockData.slice(page, page + rows));
            setTotalRecords(mockData.length);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPatients(page * rows, rows);
    }, [page, rows, fetchPatients]);

    const onPage = (event: any) => {
        setPage(event.page);
        setRows(event.rows);
    };

    const columns: TableColumn[] = [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Name', sortable: true },
        { field: 'age', header: 'Age', sortable: true },
        { field: 'gender', header: 'Gender', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'bloodType', header: 'Blood Type', sortable: true },
        {
            field: 'actions',
            header: 'Actions',
            body: (_row, _col, _rowIndex) => (
                <button
                    className="px-3 py-1 bg-primary rounded text-white"
                    onClick={() => navigate('/patients/report')}
                >
                    View Report
                </button>
            ),
            style: { textAlign: 'center', minWidth: 120 },
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
            <div className={`w-full transition-all duration-300 bg-white rounded-xl p-6`} style={{ position: 'relative' }}>
                <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <h2 className="text-2xl font-bold text-center flex-1 text-primary">Patient List</h2>
                    <Button type="button" icon="pi pi-plus" label="Add Patient" className="bg-primary text-white font-bold px-4 py-2 rounded" />
                </div>
                <CommonTable
                    value={patients}
                    columns={columns}
                    rows={rows}
                    totalRecords={totalRecords}
                    loading={loading}
                    paginator={true}
                    exportable={true}
                    onPage={onPage}
                    first={page * rows}
                    lazy={true}
                />
            </div>
        </div>
    );
};

export default PatientList;
