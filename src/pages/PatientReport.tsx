import React, { useEffect, useState } from 'react';
import CommonTable from '../component/CommonTable';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CommonButton from '../component/CommonButton';
import CommonModal from '../component/CommonModal';
import CommonInput from '../component/CommonInput';
import PatientService from '../service/Patient/PatientService';
import { toast } from 'react-hot-toast';
import { FiTrash } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';

const PatientReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state; // This is the state object passed via navigate
    const [modalOpen, setModalOpen] = useState(false);
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [reportList, setReportList] = useState<any[]>([]);
    const [filteredReportList, setFilteredReportList] = useState<any[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        debugger
        if (!deleteId) return;
        setDeleteModalOpen(false);
        toast
            .promise(PatientService.deletePatientReportService(deleteId), {
                loading: "Loading",
                success: "Report Deleted successfully",
                error: "Error when deleting Report",
            })
            .then((response: any) => {
                setReportList((prevList) => prevList.filter((report) => report._id !== deleteId));
                console.log("response", response);
            });
        setDeleteId(null);
    };

    const columns: any[] = [
        { field: "reportName", header: "Report Name", sortable: true },
        {
            field: "reportDate",
            header: "Report Date",
            sortable: true,
            body: (row: any) => {
                // If reportDate is ISO string, split at T
                if (row.reportDate && typeof row.reportDate === 'string' && row.reportDate.includes('T')) {
                    return row.reportDate.split('T')[0];
                }
                return row.reportDate || '';
            }
        },
        {
            field: "isCritical",
            header: "Critical",
            sortable: true,
            body: (row: any) => row.isCritical === true ? 'Yes' : 'No'
        },
        // { field: "value", header: "Value", sortable: true },
        // { field: "unit", header: "Unit", sortable: true },
        {
            field: "actions",
            header: "Actions",
            body: (_row: any, _col: any, _rowIndex: any) => (
                <div className="flex justify-center">
                    <FaEye
                        className="text-xl text-blue-400 cursor-pointer hover:text-blue-400"
                        onClick={() => {
                            setPdfUrl('https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf');
                            setPdfModalOpen(true);
                        }}
                    />
                    <FiTrash
                        className="text-xl ml-4 text-red-400 cursor-pointer hover:text-red-400"
                        onClick={() => handleDeleteClick(_row?._id)}
                    />
                </div>
            ),
            style: { textAlign: "center", minWidth: 120 },
        },
    ];

    const fetchUserRole = async () => {
        localStorage.getItem('role') && setRole(localStorage.getItem('role'));
        let patientId = state?.patientId ? state?.patientId : localStorage.getItem('patientId');
        if (!patientId) {
            patientId = localStorage.getItem('userId')
        };
        const response = await PatientService.fetchPatientReportsService(patientId);
        if (response?.status === 200) {
            setReportList(response?.data?.data);
        }
    }

    // Filter reports by date range
    useEffect(() => {
        if (!startDate && !endDate) {
            setFilteredReportList(reportList);
            return;
        }
        setFilteredReportList(
            reportList.filter((report) => {
                if (!report.reportDate) return false;
                const reportDate = new Date(report.reportDate);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
                if (start && reportDate < start) return false;
                if (end) {
                    // include end date full day
                    end.setHours(23, 59, 59, 999);
                    if (reportDate > end) return false;
                }
                return true;
            })
        );
    }, [reportList, startDate, endDate]);

    const viewAnalysis = () => {
        navigate('/analysis', { state: { startDate, endDate } })
    };

    useEffect(() => {
        fetchUserRole();
    }, [modalOpen]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
            {/* Back Button - top left, outside card */}
            <div className="p-6 bg-white rounded-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    {
                        role === "doctor" && (
                            <button
                                className="flex items-center justify-center w-12 h-12 bg-white shadow-md border border-gray-200 rounded-full transition-colors duration-200 z-10"
                                onClick={() => navigate(-1)}
                                title="Back"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        )
                    }
                    <h2 className="text-2xl font-bold text-center flex-1 text-primary">Patient Report</h2>
                    {
                        role === "doctor" && (
                            <CommonButton
                                className="w-auto px-6 py-2 ml-4"
                                onClick={() => setModalOpen(true)}
                            >
                                Add Report
                            </CommonButton>
                        )
                    }
                </div>

                {/* Date Range Filter - Improved UI */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-end md:gap-6 gap-4 w-full">
                    <div className="flex flex-col flex-1 min-w-[160px]">
                        <label className="font-medium mb-1 text-gray-700">Start Date</label>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            max={endDate || undefined}
                        />
                    </div>
                    <div className="flex flex-col flex-1 min-w-[160px]">
                        <label className="font-medium mb-1 text-gray-700">End Date</label>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            min={startDate || undefined}
                        />
                    </div>
                    <div className="flex flex-row gap-2 mt-4 md:mt-0">
                        <CommonButton
                            className="w-auto px-4 py-2"
                            onClick={() => { setStartDate(''); setEndDate(''); }}
                            variant="secondary"
                        >
                            Clear Filter
                        </CommonButton>
                        <CommonButton
                            className="w-auto px-4 py-2"
                            onClick={viewAnalysis}
                        >
                            View Analysis
                        </CommonButton>
                    </div>
                </div>
                <CommonTable
                    value={filteredReportList}
                    columns={columns}
                    rows={5}
                    totalRecords={filteredReportList.length}
                    loading={false}
                    paginator={false}
                    exportable={false}
                />
            </div>
            <CommonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Report">
                <AddReportForm onClose={() => setModalOpen(false)} />
            </CommonModal>
            <CommonModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} title="View Report PDF">
                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        title="Report PDF"
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                    />
                )}
            </CommonModal>
            <CommonModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Report Confirmation">
                <div className="p-4">
                    <p className="mb-6 text-lg text-gray-800">Are you sure you want to delete this report?</p>
                    <div className="flex justify-end gap-3">
                        <CommonButton variant="secondary" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </CommonButton>
                        <CommonButton variant="danger" onClick={confirmDelete}>
                            Delete
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </div>
    );
};

const AddReportForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const location = useLocation();
    const state = location.state;
    const [reportName, setReportName] = React.useState('');
    const [file, setFile] = React.useState<File | null>(null);
    const [dragActive, setDragActive] = React.useState(false);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setError('');
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reportName) {
            setError('Report name is required');
            return;
        }
        if (!file) {
            setError('Please upload a file');
            return;
        }
        setLoading(true);
        try {
            // Create FormData payload
            const patientId = state?.patientId ? state?.patientId : localStorage.getItem('patientId');
            const formData = new FormData();
            formData.append('reportName', reportName);
            formData.append('patient_id', patientId || '');
            if (file) {
                formData.append('file', file);
            }
            const uploadPromise = PatientService.createPatientReportService(formData);
            toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Report uploaded successfully',
                error: 'Error uploading report'
            });
            const response = await uploadPromise;
            console.log('response', response)
            // For demonstration, log the FormData content as an object
            const payload: { [key: string]: any } = { reportName };
            if (file) payload.file = file;
            console.log('Payload:', payload);
            // If you want to see FormData entries:
            // for (let pair of formData.entries()) { console.log(pair[0]+ ':', pair[1]); }
            setReportName('');
            setFile(null);
            setError('');
            onClose();

        } catch (err) {
            // error handled by toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <CommonInput
                label="Report Name"
                type="text"
                value={reportName}
                onChange={setReportName}
                error={error === 'Report name is required' ? error : undefined}
                placeholder="Enter report name"
            />
            <div>
                <label
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <span className="text-gray-500 mb-2">Drag & drop file here, or click to select</span>
                    <input
                        type="file"
                        accept='.pdf'
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {file && <span className="mt-2 text-blue-600 font-medium">{file.name}</span>}
                </label>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex justify-end gap-3 pt-2">
                <CommonButton type="button" variant="secondary" className="w-auto px-6" onClick={onClose} disabled={loading}>
                    Cancel
                </CommonButton>
                <CommonButton type="submit" className="w-auto px-6" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </CommonButton>
            </div>
        </form>
    );
};
export default PatientReport;
