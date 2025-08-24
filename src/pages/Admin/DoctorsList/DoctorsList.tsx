import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { TableColumn } from '../../../component/CommonTable';
import AuthService from '../../../service/Auth/AuthService'
import CommonButton from '../../../component/CommonButton';
import CommonTable from '../../../component/CommonTable';
import CommonModal from '../../../component/CommonModal';
import CommonInput from '../../../component/CommonInput';

interface Doctor {
    id: number;
    name: string;
    phone: number;
    address: string;
    email: string;
}

const DoctorsList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(10);

    // Simulate server-side fetch with fallback mock data
    const fetchDoctors = useCallback(async (page: number, rows: number) => {
        setLoading(true);
        try {
            // Replace this with your real API endpoint
            const mockData: Doctor[] = Array.from({ length: 52 }, (_, i) => ({
                id: i + 1,
                name: `Dcotor ${i + 1}`,
                email: `Doctor${i + 1}@example.com`,
                phone: 1234567890,
                address: `Address: ${i+1}`
            }));
            setDoctors(mockData.slice(page, page + rows));
            setTotalRecords(mockData.length);
        } catch (error) {
            // Fallback mock data for demo
            const mockData: Doctor[] = Array.from({ length: 52 }, (_, i) => ({
                id: i + 1,
                name: `Dcotor ${i + 1}`,
                email: `Doctor${i + 1}@example.com`,
                phone: 1234567890,
                address: `Address: ${i+1}`
            }));
            setDoctors(mockData.slice(page, page + rows));
            setTotalRecords(mockData.length);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchDoctors(page * rows, rows);
    }, [page, rows, fetchDoctors]);

    const onPage = (event: any) => {
        setPage(event.page);
        setRows(event.rows);
    };

    const columns: TableColumn[] = [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'phone', header: 'Phone Number', sortable: true },
        { field: 'address', header: 'Address', sortable: true }
    ];

    // Modal state and form state
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        address: '',
    });
    console.log('form', form)
    const [formErrors, setFormErrors] = useState<any>({});

    const handleFormChange = (field: string, value: any) => {
            setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const errors: any = {};
        const phoneRegex = /^\d{10}$/;
        if (!form.email) errors.email = 'Email is required';
        if (!form.password) errors.password = 'Password is required';
        if (!form.fullName) errors.fullName = 'Full name is required';
        if (!form.phone) {
            errors.phone = 'Phone is required';
        } else if (!phoneRegex.test(form.phone)) {
            errors.phone = 'Phone must be 10 digits';
        }
        if (!form.address) errors.address = 'Address is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (validateForm()) {
            toast.promise(
                AuthService.registerDoctorService(form),
                {
                    loading: 'Loading',
                    success: 'Doctor created successfully',
                    error: 'Error when fetching',
                }
            ).then((response: any) => {
                console.log('response', response);
                setModalOpen(false);
                setForm({
                    email: '', password: '', fullName: '', phone: '', address: ''
                });
                setFormErrors({});
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
            <div className={`w-full transition-all duration-300 bg-white rounded-xl p-6`} style={{ position: 'relative' }}>
                <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <h2 className="text-2xl font-bold text-center flex-1 text-primary">Doctors List</h2>
                    <CommonButton
                        className="w-auto px-6 py-2 ml-4"
                        onClick={() => setModalOpen(true)}
                    >
                        Add Doctor
                    </CommonButton>
                </div>
                <CommonTable
                    value={doctors}
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
            {/* Render modal here, outside the main content container */}
            <CommonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Dcotor">
                <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                    <CommonInput
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={v => handleFormChange('email', v)}
                        error={formErrors.email}
                        placeholder="Enter email"
                    />
                    <CommonInput
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={v => handleFormChange('password', v)}
                        error={formErrors.password}
                        placeholder="Enter password"
                    />
                    <CommonInput
                        label="Full Name"
                        value={form.fullName}
                        onChange={v => handleFormChange('fullName', v)}
                        error={formErrors.fullName}
                        placeholder="Enter full name"
                    />
                    <CommonInput
                        label="Phone"
                        type="number"
                        value={form.phone}
                        onChange={v => handleFormChange('phone', v)}
                        error={formErrors.phone}
                        placeholder="Enter phone number"
                    />
                    <CommonInput
                        label="Address"
                        value={form.address}
                        onChange={v => handleFormChange('address', v)}
                        error={formErrors.address}
                        placeholder="Enter address"
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <CommonButton type="button" variant="secondary" className="w-auto px-6" onClick={() => setModalOpen(false)}>
                            Cancel
                        </CommonButton>
                        <CommonButton type="submit" className="w-auto px-6">
                            Save
                        </CommonButton>
                    </div>
                </form>
            </CommonModal>
        </div>
    );
};

export default DoctorsList;
