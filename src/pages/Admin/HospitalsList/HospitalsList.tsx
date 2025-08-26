import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { TableColumn } from '../../../component/CommonTable';
import AuthService from '../../../service/Auth/AuthService'
import CommonButton from '../../../component/CommonButton';
import CommonTable from '../../../component/CommonTable';
import CommonModal from '../../../component/CommonModal';
import CommonInput from '../../../component/CommonInput';
import AdminService from '../../../service/Admin/AdminService';

interface Hospital {
    id: number;
    name: string;
    country: string;
    email: string;
    state: string;
    address: string;
}

const HospitalsList: React.FC = () => {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [totalRecords, _setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(10);

    //     const countries = ["United States", "Canada", "India", "United Kingdom", "Germany"];
    // const states = ["California", "Texas", "New York", "Ontario", "Gujarat"]
        // const countriesOptions = countries.map(c => ({ label: c, value: c }));
        // const stateOptions = states.map(s => ({ label: s, value: s }));


    // Simulate server-side fetch with fallback mock data
    const fetchHospitals = useCallback(async (_page: number, _rows: number) => {
        setLoading(true);
        try {
            toast.promise(
                                AdminService.getAllHospitals(),
                                {
                                    loading: 'Loading',
                                    success: 'Hospitals Fetched successfully',
                                    error: 'Error when fetching hospitals',
                                }
                            ).then((response: any) => {
                                setHospitals(response?.data?.data)
                                console.log('all hospital response', response);
                                // setPatients((prevPatients) => [...prevPatients, response.data?.patient]);
                            });
            // Replace this with your real API endpoint
            // const mockData: Hospital[] = Array.from({ length: 52 }, (_, i) => ({
            //     id: i + 1,
            //     name: `Hospital ${i + 1}`,
            //     email: `hospital${i + 1}@example.com`,
            //     address: `Address: ${i+1}`,
            //     country: "Inidia",
            //     state: "Gujarat"
            // }));
            // setHospitals(mockData.slice(page, page + rows));
            // setTotalRecords(mockData.length);
        } catch (error) {
            // Fallback mock data for demo
            // const mockData: Hospital[] = Array.from({ length: 52 }, (_, i) => ({
            //     id: i + 1,
            //     name: `Hospital ${i + 1}`,
            //     email: `hospital${i + 1}@example.com`,
            //     address: `Address: ${i+1}`,
            //     country: "Inidia",
            //     state: "Gujarat"
            // }));
            // setHospitals(mockData.slice(page, page + rows));
            // setTotalRecords(mockData.length);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchHospitals(page * rows, rows);
    }, [page, rows, fetchHospitals]);

    const onPage = (event: any) => {
        setPage(event.page);
        setRows(event.rows);
    };

    const columns: TableColumn[] = [
        { field: 'id', header: 'ID', sortable: true },
        { field: 'name', header: 'Hospital Name', sortable: true },
        { field: 'email', header: 'Official Email', sortable: true },
        { field: 'registrationNumber', header: 'Registration Number', sortable: true },
        { field: 'type', header: 'Hospital Type', sortable: true },
        { field: 'address', header: 'Address', sortable: true }
    ];

    // Modal state and form state
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        address: '',
        // country: '',
        // state: '',
        registrationNumber:'',
        type: ''
    });
    console.log('form', form)
    const [formErrors, setFormErrors] = useState<any>({});

    const handleFormChange = (field: string, value: any) => {
            setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const errors: any = {};
        if (!form.email) errors.email = 'Email is required';
        if (!form.password) errors.password = 'Password is required';
        if (!form.name) errors.name = 'Hospital Name is required';
        if (!form.address) errors.address = 'Address is required';
        if (!form.registrationNumber) errors.registrationNumber = 'Registration Number is required';
        if (!form.type) errors.type = 'Hospital Type is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (validateForm()) {
            toast.promise(
                AuthService.registerHospitalService(form),
                {
                    loading: 'Loading',
                    success: 'Hospital created successfully',
                    error: 'Error Creating Hospital',
                }
            ).then((response: any) => {
                console.log('response', response);
                setModalOpen(false);
                setForm({
                    email: '', password: '', name: '', address: '', registrationNumber: '', type:''
                });
                fetchHospitals(page * rows, rows);                
                setFormErrors({});
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
            <div className={`w-full transition-all duration-300 bg-white rounded-xl p-6`} style={{ position: 'relative' }}>
                <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <h2 className="text-2xl font-bold text-center flex-1 text-primary">Hospitals List</h2>
                    <CommonButton
                        className="w-auto px-6 py-2 ml-4"
                        onClick={() => setModalOpen(true)}
                    >
                        Add Hospital
                    </CommonButton>
                </div>
                <CommonTable
                    value={hospitals}
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
            <CommonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Hospital">
                <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                    <CommonInput
                        label="Hospital Name"
                        value={form.name}
                        onChange={v => handleFormChange('name', v)}
                        error={formErrors.name}
                        placeholder="Enter Hospital Name"
                    />
                    <CommonInput
                        label="Hospital Registration Number"
                        value={form.registrationNumber}
                        onChange={v => handleFormChange('registrationNumber', v)}
                        error={formErrors.registrationNumber}
                        placeholder="Enter Hospital Registration Number"
                    />
                    <CommonInput
                        label="Type"
                        value={form.type}
                        onChange={v => handleFormChange('type', v)}
                        error={formErrors.type}
                        placeholder="Enter Hospital Name"
                    />
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
                        label="Address"
                        value={form.address}
                        onChange={v => handleFormChange('address', v)}
                        error={formErrors.address}
                        placeholder="Enter address"
                    />
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <CommonDropdown
                            label="Country"
                            value={form.country}
                            onChange={v => handleFormChange('country', v)}
                            options={countriesOptions}
                            error={formErrors['country']}
                            placeholder="Select"
                        />
                        <CommonDropdown
                            label="State"
                            value={form.state}
                            onChange={v => handleFormChange('state', v)}
                            options={stateOptions}
                            error={formErrors['state']}
                            placeholder="Select"
                        />
                    </div> */}
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

export default HospitalsList;
