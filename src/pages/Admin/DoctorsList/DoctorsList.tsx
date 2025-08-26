import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { TableColumn } from '../../../component/CommonTable';
import AuthService from '../../../service/Auth/AuthService'
import CommonButton from '../../../component/CommonButton';
import CommonTable from '../../../component/CommonTable';
import CommonModal from '../../../component/CommonModal';
import CommonInput from '../../../component/CommonInput';
import AdminService from '../../../service/Admin/AdminService';
import CommonDropdown from '../../../component/CommonDropdown';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DoctorService from '../../../service/Doctor/DoctorService';
import HospitalServices from '../../../service/Hospital/HospitalServices';

interface Doctor {
    id: number;
    fullName: string;
    // phone: number;
    // address: string;
    licenseNumber: string,
    specialization: string;
}

const DoctorsList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(10);
    const [isEditMode, setIsEditMode] = useState(false);
    const [_editDoctorId, setDoctorId] = useState('');
    const [hospitals, setHospitals] = useState([{label: '', value: ''}])

    // const hospitals = [
    //     { label: "Hospital 1", value: '68a98f2adf4c284e6966b693' }
    // ];

    const fetchHospitalOptions = async() => {
        try {
                const response = await HospitalServices.getHospitalOptionsService();
                setHospitals(response.data?.hospitals.map((h: any) => {return {label: h.name, value: h._id}}))
                console.log("response", response);
            } catch (error) {
                setHospitals([]);
                // setTotalRecords(mockData.length);
            }
            setLoading(false);
    }

    useEffect(() => {
        fetchHospitalOptions();
    }, []);

    // Simulate server-side fetch with fallback mock data
    const fetchDoctors = useCallback(async (page: number, rows: number) => {
        setLoading(true);
        try {
            const response = await AdminService.getDoctors();
            console.log("response", response, page, rows);
            const mockData = response?.data?.data || [];
            setDoctors(mockData);
            setTotalRecords(mockData.length);
        } catch (error) {
            setDoctors([]);
            // setTotalRecords(mockData.length);
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


    const editDoctor = (Id: string) => {
        toast
            .promise(DoctorService.getDoctorById(Id), {
                loading: "Loading",
                //   success: "Report Deleted successfully",
                error: "Error when fetching patient details",
            })
            .then((response: any) => {
                console.log("Edit response", response);
                const doctorData = response?.data?.doctor;
                setForm({
                    email: doctorData.email, password: '', fullName: doctorData.fullName, phone: doctorData.contactNumber, licenseNumber: doctorData.licenseNumber, specialization: doctorData.specialization, hospital: doctorData.hospital, role: 'doctor'
                });
                setIsEditMode(true);
                setDoctorId(Id);
                setModalOpen(true);
            });
    };

    const deleteDoctor = (_Id: string) => {
        toast
            .promise(AuthService.deleteUserService(), {
                loading: "Loading",
                success: "Doctor Deleted successfully",
                error: "Error when deleting Doctor",
            })
            .then((response: any) => {
                console.log("response", response);
                fetchDoctors(page * rows, rows);
            });
    };

    const columns: TableColumn[] = [
        { field: '_id', header: 'ID', sortable: true },
        { field: 'fullName', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        // { field: 'phone', header: 'Phone Number', sortable: true },
        // { field: 'address', header: 'Address', sortable: true }
        { field: 'licenseNumber', header: 'License Number', sortable: true },
        { field: 'specialization', header: 'Specialization', sortable: true },
        {
            field: 'actions',
            header: 'Actions',
            body: (_row, _col, _rowIndex) => (
                <div className="flex justify-center">
                    <FiEdit
                        className="text-xl ml-4 text-blue-400 cursor-pointer hover:text-blue-400"
                        onClick={() => editDoctor(_row._id)}
                    />
                    <FiTrash
                        className="text-xl ml-4 text-red-400 cursor-pointer hover:text-red-400"
                        onClick={() => deleteDoctor(_row?.id)}
                    />
                </div>
            ),
            style: { textAlign: 'center', minWidth: 120 },
        },
    ];

    // Modal state and form state
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        licenseNumber: '',
        specialization: '',
        hospital: '',
        role: 'doctor'
        // address: '',
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
        if (!form.licenseNumber) errors.licenseNumber = 'License Number is required';
        if (!form.specialization) errors.specialization = 'Specialization is required';
        if (!form.hospital) errors.hospital = 'Select Hospital';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        form.role = 'doctor';
        if (validateForm()) {
            if (isEditMode) {
                toast.promise(
                    AuthService.updateUserService(form),
                    {
                        loading: 'Loading',
                        success: 'Doctor Updated successfully',
                        error: 'Error Updating Doctor',
                    }
                ).then((response: any) => {
                    console.log('response', response);
                    setModalOpen(false);
                    setIsEditMode(false);
                    setForm({
                        email: '', password: '', fullName: '', phone: '', licenseNumber: '', specialization: '', hospital: '', role: 'doctor'
                    });
                    setFormErrors({});
                });
            }
            else {
                toast.promise(
                    AuthService.registerService(form),
                    {
                        loading: 'Loading',
                        success: 'Doctor created successfully',
                        error: 'Error Creating Doctor',
                    }
                ).then((response: any) => {
                    console.log("response", response);
                    fetchDoctors(page * rows, rows);
                    setModalOpen(false);
                    setForm({
                        email: '', password: '', fullName: '', phone: '', licenseNumber: '', specialization: '', hospital: '', role: 'doctor'
                    });
                    setFormErrors({});
                });
            }
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
            <CommonModal isOpen={modalOpen} onClose={() => {
                setModalOpen(false); setIsEditMode(false); setForm({
                    email: '', password: '', fullName: '', phone: '', licenseNumber: '', specialization: '', hospital: '', role: 'doctor'
                });
            }} title={isEditMode ? "Update Doctor" : "Add Doctor"}>
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
                        label="License Number"
                        value={form.licenseNumber}
                        onChange={v => handleFormChange('licenseNumber', v)}
                        error={formErrors.licenseNumber}
                        placeholder="Enter License Number"
                    />
                    <CommonInput
                        label="pecialization"
                        value={form.specialization}
                        onChange={v => handleFormChange('specialization', v)}
                        error={formErrors.specialization}
                        placeholder="Enter Specialization"
                    />

                    <CommonDropdown
                        label="Hospital"
                        value={form.hospital}
                        onChange={v => handleFormChange('hospital', v)}
                        options={hospitals}
                        error={formErrors['hospital']}
                        placeholder="Select"
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <CommonButton type="button" variant="secondary" className="w-auto px-6" onClick={() => {
                            setModalOpen(false); setIsEditMode(false); setForm({
                                email: '', password: '', fullName: '', phone: '', licenseNumber: '', specialization: '', hospital: '', role: 'doctor'
                            });
                        }}>
                            Cancel
                        </CommonButton>
                        <CommonButton type="submit" className="w-auto px-6">
                            {isEditMode ? "Update" : "Save"}
                        </CommonButton>
                    </div>
                </form>
            </CommonModal>
        </div>
    );
};

export default DoctorsList;
