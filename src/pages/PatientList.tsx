import React, { useEffect, useState, useCallback } from 'react';
import CommonModal from '../component/CommonModal';
import CommonButton from '../component/CommonButton';
import CommonInput from '../component/CommonInput';
import CommonTable from '../component/CommonTable';
import CommonDropdown from '../component/CommonDropdown';
import type { TableColumn } from '../component/CommonTable';
import { useNavigate } from 'react-router-dom';
import PatientService from '../service/Patient/PatientService';
// import DoctorService from '../service/Doctor/DoctorService';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { HiOutlineDocumentReport } from "react-icons/hi";
import DoctorService from '../service/Doctor/DoctorService';
import HospitalServices from '../service/Hospital/HospitalServices';

interface Patient {
    id: string;
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
    const [isEditMode, setIsEditMode] = useState(false);
    const [_editPatientId, setEditPatientId] = useState('');
    const [hospitals, setHospitals] = useState([{ label: '', value: '' }]);
    const [doctors, setDoctors] = useState([{ label: '', value: '' }]);
    const [role, setRole] = useState<string | null>('patient');


    const fetchHospitalOptions = async () => {
        try {
            const role = localStorage.getItem('role');
            setRole(role);
            const response = await HospitalServices.getHospitalOptionsService();
            setHospitals(response.data?.hospitals.map((h: any) => { return { label: h.name, value: h._id } }))
            console.log("response", response);
        } catch (error) {
            // setTotalRecords(mockData.length);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchHospitalOptions();
    }, []);

    const fetchPatients = useCallback(async (page: number, rows: number) => {
        setLoading(true);
        const role = localStorage.getItem('role');
        try {
            if (role !== "admin") {
                const response = await DoctorService.getPatientsListService({ page: Math.floor(page / rows) + 1, limit: rows });
                const data = response?.data?.data || [];
                setPatients(data);
                setTotalRecords(response?.data?.total || data.length);
            } else {
                const response = await DoctorService.getAllPatientsListService({ page: Math.floor(page / rows) + 1, limit: rows });
                const data = response?.data?.data || [];
                setPatients(data);
                setTotalRecords(response?.data?.total || data.length);
            }
        } catch (error) {
            setPatients([]);
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

    const editPatient = (_Id: string) => {
        toast.success("Coming soon...")
        // toast
        //     .promise(PatientService.getPatientService(Id), {
        //         loading: "Loading",
        //         error: "Error when fetching patient details",
        //     })
        //     .then((response: any) => {
        //         console.log("response", response);
        //         const patientData = response?.data?.patient;
        //         setIsEditMode(true);
        //         setEditPatientId(Id);
        //         setForm({
        //             email: patientData.email,
        //             password: "",
        //             fullName: patientData.fullName,
        //             dob: patientData.dob,
        //             phone: patientData.emergencyContact.phone,
        //             address: patientData.address,
        //             emergencyContact: {
        //                 name: patientData.emergencyContact.name,
        //                 phone: patientData.emergencyContact.phone,
        //                 relationship: patientData.emergencyContact.relationship,
        //             },
        // hospital: patientData.hospital,
        // doctor: patientData.doctor
        //             role: "patient"
        //         });
        //         setModalOpen(true);
        //     });
    };

    const deletePatient = (_Id: string) => {
        toast.success("Coming soon...")
        // toast
        //     .promise(PatientService.deletePatientService(Id), {
        //         loading: "Loading",
        //         success: "Patient Deleted successfully",
        //         error: "Error when deleting Patient",
        //     })
        //     .then((response: any) => {
        //         console.log("response", response);
        //         fetchPatients(page * rows, rows);
        //     });
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const calculateAge = (dobString: string) => {
        if (!dobString) return '';
        const dob = new Date(dobString);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    const columns: TableColumn[] = [
        {
            field: 'index',
            header: 'ID',
            sortable: false,
            body: (_row: any, _col: any, rowIndex: number) => page * rows + rowIndex + 1,
            style: { textAlign: 'center', width: 60 },
        },
        { field: 'fullName', header: 'Name', sortable: true },
        {
            field: 'dob',
            header: 'DOB',
            sortable: true,
            body: (row: any) => formatDate(row?.dob),
        },
        {
            field: 'age',
            header: 'Age',
            sortable: true,
            body: (row: any) => calculateAge(row?.dob),
        },
        { field: 'gender', header: 'Gender', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'bloodGroup', header: 'Blood Type', sortable: true },
        {
            field: 'actions',
            header: 'Actions',
            body: (_row, _col, _rowIndex) => (
                <div className="flex justify-center">
                    <HiOutlineDocumentReport
                        className="text-xl text-blue-400 cursor-pointer hover:text-blue-400"
                        onClick={() => navigate('/patients/report', { state: { patientId: _row._id } })}
                    />
                    <FiEdit
                        className="text-xl ml-4 text-blue-400 cursor-pointer hover:text-blue-400"
                        onClick={() => editPatient(_row._id)}
                    />
                    <FiTrash
                        className="text-xl ml-4 text-red-400 cursor-pointer hover:text-red-400"
                        onClick={() => deletePatient(_row?.id)}
                    />
                </div>
            ),
            style: { textAlign: 'center', minWidth: 120 },
        },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        dob: '',
        phone: '',
        address: '',
        emergencyContact: {
            name: '',
            phone: '',
            relationship: '',
        },
        role: "patient",
        doctor: '',
        hospital: '',
        bloodGroup: '',
        gender: ''
    });

    const fetchDoctorsByHospital = async () => {
        try {
            debugger;
            const response = await DoctorService.getDoctorByHospitalService(form.hospital);
            setDoctors(response.data?.data?.map((d: any) => { return { label: d.fullName, value: d._id } }));
        } catch (error) {
            // setTotalRecords(mockData.length);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchDoctorsByHospital();
    }, [form.hospital]);

    const [formErrors, setFormErrors] = useState<any>({});

    const relationships = ['Spouse', 'Parent', 'Sibling', 'Friend', 'Other'];
    const relationshipOptions = relationships.map(r => ({ label: r, value: r }));

    const handleFormChange = (field: string, value: any) => {
        if (field.startsWith('emergencyContact.')) {
            const subField = field.split('.')[1];
            setForm((prev) => ({
                ...prev,
                emergencyContact: { ...prev.emergencyContact, [subField]: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [field]: value }));
        }
    };

    const validateForm = () => {
        const errors: any = {};
        const phoneRegex = /^\d{10}$/;
        if (!form.email) errors.email = 'Email is required';
        if (!form.password && !isEditMode) errors.password = 'Password is required';
        if (!form.fullName) errors.fullName = 'Full name is required';
        if (!form.dob) {
            errors.dob = 'Date of birth is required';
        } else {
            const today = new Date();
            const dobDate = new Date(form.dob);
            // Remove time part for accurate comparison
            today.setHours(0, 0, 0, 0);
            dobDate.setHours(0, 0, 0, 0);
            if (dobDate > today) {
                errors.dob = 'Date of birth cannot be in the future';
            }
        }
        if (!form.phone) {
            errors.phone = 'Phone is required';
        } else if (!phoneRegex.test(form.phone)) {
            errors.phone = 'Phone must be 10 digits';
        }
        if (!form.address) errors.address = 'Address is required';
        if (!form.emergencyContact.name) errors['emergencyContact.name'] = 'Emergency contact name is required';
        if (!form.emergencyContact.phone) {
            errors['emergencyContact.phone'] = 'Emergency contact phone is required';
        } else if (!phoneRegex.test(form.emergencyContact.phone)) {
            errors['emergencyContact.phone'] = 'Emergency contact phone must be 10 digits';
        }
        if (!form.emergencyContact.relationship) errors['emergencyContact.relationship'] = 'Relationship is required';
        if (!form.hospital) errors['hospital'] = 'Hospital is required';
        if (!form.doctor) errors['doctor'] = 'Doctor is required';
        if (!form.bloodGroup) errors['bloodGroup'] = 'Blood group is required';
        if (!form.gender) errors['gender'] = 'Gender is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (validateForm()) {
            if (isEditMode) {
                // In edit mode, just log the data
                console.log('Edit Patient Data:', form);
                // setModalOpen(false);
                setForm({
                    email: '', password: '', fullName: '', dob: '', phone: '', address: '',
                    emergencyContact: { name: '', phone: '', relationship: '' }, doctor: '', hospital: '',
                    role: 'patient', bloodGroup: '', gender: ''
                });
                setFormErrors({});
            } else {
                toast.promise(
                    PatientService.createPatientService(form),
                    {
                        loading: 'Loading',
                        success: 'Patient created successfully',
                        error: 'Error when fetching',
                    }
                ).then(async (response: any) => {
                    console.log('response', response);
                    // const responsePatient = await DoctorService.getPatientsListService({ page: Math.floor(page / rows) + 1, limit: rows });
                    // const data = responsePatient?.data?.data || [];
                    // setPatients(data);
                    // setTotalRecords(responsePatient?.data?.total || data.length);
                    if (role != "admin") {
                        const response = await DoctorService.getPatientsListService({ page: Math.floor(page / rows) + 1, limit: rows });
                        const data = response?.data?.data || [];
                        setPatients(data);
                        setTotalRecords(response?.data?.total || data.length);
                    } else {
                        const response = await DoctorService.getAllPatientsListService({ page: Math.floor(page / rows) + 1, limit: rows });
                        const data = response?.data?.data || [];
                        setPatients(data);
                        setTotalRecords(response?.data?.total || data.length);
                    }
                    // setPatients((prevPatients) => [...prevPatients, response.data?.data?.user]);
                    setModalOpen(false);
                    setForm({
                        email: '', password: '', fullName: '', dob: '', phone: '', address: '',
                        emergencyContact: { name: '', phone: '', relationship: '' }, doctor: '', hospital: '',
                        role: 'patient', bloodGroup: '', gender: ''
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
                    <h2 className="text-2xl font-bold text-center flex-1 text-primary">Patient List</h2>
                    <CommonButton
                        className="w-auto px-6 py-2 ml-4"
                        onClick={() => setModalOpen(true)}
                    >
                        Add Patient
                    </CommonButton>
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
            <CommonModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setIsEditMode(false); setEditPatientId('') }} title={isEditMode ? "Update Patient" : "Add Patient"}>
                <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                    <CommonInput
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={v => handleFormChange('email', v)}
                        error={formErrors.email}
                        placeholder="Enter email"
                        disabled={isEditMode}
                        readOnly={isEditMode}
                    />
                    {
                        !isEditMode && (
                            <CommonInput
                                label="Password"
                                type="password"
                                value={form.password}
                                onChange={v => handleFormChange('password', v)}
                                error={formErrors.password}
                                placeholder="Enter password"
                                disabled={isEditMode}
                                readOnly={isEditMode}
                            />
                        )
                    }
                    <CommonInput
                        label="Full Name"
                        value={form.fullName}
                        onChange={v => handleFormChange('fullName', v)}
                        error={formErrors.fullName}
                        placeholder="Enter full name"
                    />
                    <CommonInput
                        label="Date of Birth"
                        type="date"
                        value={form.dob ? new Date(form.dob).toISOString().slice(0, 10) : ''}
                        onChange={v => handleFormChange('dob', v)}
                        error={formErrors.dob}
                        max={new Date().toISOString().split('T')[0]}
                        disabled={isEditMode}
                    />
                    <CommonInput
                        label="Phone"
                        type="text"
                        value={form.phone}
                        onChange={v => handleFormChange('phone', v)}
                        error={formErrors.phone}
                        placeholder="Enter phone number"
                        disabled={isEditMode}
                        readOnly={isEditMode}
                    />
                    <CommonInput
                        label="Address"
                        value={form.address}
                        onChange={v => handleFormChange('address', v)}
                        error={formErrors.address}
                        placeholder="Enter address"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <CommonInput
                            label="Blood Group"
                            value={form.bloodGroup}
                            onChange={v => handleFormChange('bloodGroup', v)}
                            error={formErrors.bloodGroup}
                            placeholder="Enter blood group"
                        />
                        <CommonDropdown
                            label="Gender"
                            value={form.gender}
                            onChange={v => handleFormChange('gender', v)}
                            options={[
                                { value: 'Male', label: 'Male' },
                                { value: 'Female', label: 'Female' },
                                { value: 'Other', label: 'Other' },
                            ]}
                            error={formErrors.gender}
                            placeholder="Select"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <CommonInput
                            label="Emergency Contact Name"
                            value={form.emergencyContact.name}
                            onChange={v => handleFormChange('emergencyContact.name', v)}
                            error={formErrors['emergencyContact.name']}
                            placeholder="Name"
                        />
                        <CommonInput
                            label="Emergency Contact Phone"
                            type="text"
                            value={form.emergencyContact.phone}
                            onChange={v => handleFormChange('emergencyContact.phone', v)}
                            error={formErrors['emergencyContact.phone']}
                            placeholder="Phone"
                        />
                        <CommonDropdown
                            label="Relation With Them"
                            value={form.emergencyContact.relationship}
                            onChange={v => handleFormChange('emergencyContact.relationship', v)}
                            options={relationshipOptions}
                            error={formErrors['emergencyContact.relationship']}
                            placeholder="Select"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <CommonDropdown
                            label="Select Hospital"
                            value={form.hospital}
                            onChange={v => handleFormChange('hospital', v)}
                            options={hospitals}
                            error={formErrors['hospital']}
                            placeholder="Select"
                        />
                        <CommonDropdown
                            label="Select Doctor"
                            value={form.doctor}
                            onChange={v => handleFormChange('doctor', v)}
                            options={doctors}
                            error={formErrors['doctor']}
                            placeholder="Select"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <CommonButton type="button" variant="secondary" className="w-auto px-6" onClick={() => setModalOpen(false)}>
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

export default PatientList;
