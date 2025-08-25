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
import { FaEye } from 'react-icons/fa';
import { FiEdit, FiTrash } from 'react-icons/fi';

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
    const [editPatientId, setEditPatientId] = useState('');

    // Simulate server-side fetch with fallback mock data
    const fetchPatients = useCallback(async (page: number, rows: number) => {
        setLoading(true);
        try {
            // Replace this with your real API endpoint
            const mockData: Patient[] = Array.from({ length: 52 }, (_, i) => ({
                id: '68abf55e9df6b967378b2ef8',
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
                id: '68abf55e9df6b967378b2ef8',
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

    // const fetchPatients = useCallback(async (page: number, rows: number) => {
        //   toast
        //     .promise(DoctorService.getPatientsService(), {
        //       loading: "Loading",
        //       success: "Patients Fetched successfully",
        //       error: "Error when fetching Patients",
        //     })
        //     .then((response: any) => {
        //         debugger
        //                     setPatients(response?.data?.data?.slice(page, page + rows));
        //     setTotalRecords(response?.data?.data.length);
        //       console.log("response", response);
        //     });
        // }, []);

    useEffect(() => {
        fetchPatients(page * rows, rows);
    }, [page, rows, fetchPatients]);

    const onPage = (event: any) => {
        setPage(event.page);
        setRows(event.rows);
    };

    const editPatient = (Id: string) => {
      toast
        .promise(PatientService.getPatientService(Id), {
          loading: "Loading",
          //   success: "Report Deleted successfully",
          error: "Error when fetching patient details",
        })
        .then((response: any) => {
          console.log("response", response);
          const patientData = response?.data?.patient;
          setIsEditMode(true);
          setEditPatientId(Id);
          setForm({
            email: patientData.email,
            password: "",
            fullName: patientData.fullName,
            dob: patientData.dob,
            phone: patientData.emergencyContact.phone,
            address: patientData.address,
            emergencyContact: {
              name: patientData.emergencyContact.name,
              phone: patientData.emergencyContact.phone,
              relationship: patientData.emergencyContact.relationship,
            },
          });
          setModalOpen(true);
        });
    };

     const deletePatient = (Id: string) => {
       toast
         .promise(PatientService.deletePatientService(Id), {
           loading: "Loading",
           success: "Patient Deleted successfully",
           error: "Error when deleting Patient",
         })
         .then((response: any) => {
            console.log("response", response);
           fetchPatients(page * rows, rows);
         });
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
                <div className="flex justify-center">
                            <FaEye
                              className="text-xl text-blue-400 cursor-pointer hover:text-blue-400"
                              onClick={() => navigate('/patients/report')}
                            />
                            <FiEdit
                              className="text-xl ml-4 text-blue-400 cursor-pointer hover:text-blue-400"
                              onClick={() => editPatient(_row.id)}
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

    // Modal state and form state
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
    });
    console.log('form', form)
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
        if (!form.password) errors.password = 'Password is required';
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
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (validateForm()) {
            // On valid, log the payload
            console.log('Patient Payload:', form);
            if(isEditMode) {
                toast.promise(
                PatientService.updatePatientService(editPatientId, form),
                {
                    loading: 'Loading',
                    success: 'Patient Updated successfully',
                    error: 'Error Updating Patient',
                }
            ).then((response: any) => {
                console.log('response', response);
                setModalOpen(false);
                setForm({
                    email: '', password: '', fullName: '', dob: '', phone: '', address: '',
                    emergencyContact: { name: '', phone: '', relationship: '' },
                });
                setFormErrors({});
            });
            }
            else {
            toast.promise(
                PatientService.createPatientService(form),
                {
                    loading: 'Loading',
                    success: 'Patient created successfully',
                    error: 'Error when fetching',
                }
            ).then((response: any) => {
                console.log('response', response);
                setModalOpen(false);
                setForm({
                    email: '', password: '', fullName: '', dob: '', phone: '', address: '',
                    emergencyContact: { name: '', phone: '', relationship: '' },
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
            {/* Render modal here, outside the main content container */}
            <CommonModal isOpen={modalOpen} onClose={() => {setModalOpen(false); setIsEditMode(false); setEditPatientId('')}} title={isEditMode ? "Update Patient" : "Add Patient"}>
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
                        label="Date of Birth"
                        type="date"
                        value={form.dob}
                        onChange={v => handleFormChange('dob', v)}
                        error={formErrors.dob}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    <CommonInput
                        label="Phone"
                        type="text"
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
                    <div className="flex justify-end gap-3 pt-2">
                        <CommonButton type="button" variant="secondary" className="w-auto px-6" onClick={() => setModalOpen(false)}>
                            Cancel
                        </CommonButton>
                        <CommonButton type="submit" className="w-auto px-6">
                            { isEditMode ? "Update" : "Save"}
                        </CommonButton>
                    </div>
                </form>
            </CommonModal>
        </div>
    );
};

export default PatientList;
