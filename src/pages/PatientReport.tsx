// Restore PatientReport component
const mockReports = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    test: `Test ${i + 1}`,
    result: i % 2 === 0 ? 'Normal' : 'Abnormal',
    value: `${Math.round(Math.random() * 100)}`,
    unit: 'mg/dL',
}));

const PatientReport: React.FC = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

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
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="flex items-center justify-center w-12 h-12 bg-white shadow-md border border-gray-200 rounded-full transition-colors duration-200 z-10"
                        onClick={() => navigate(-1)}
                        title="Back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-center flex-1 text-primary">Patient Report</h2>
                    <CommonButton
                        className="w-auto px-6 py-2 ml-4"
                        onClick={() => setModalOpen(true)}
                    >
                        Add Report
                    </CommonButton>
                </div>

                {/* <h2 className="text-2xl font-bold mb-4 text-primary text-center">Patient Report</h2> */}
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
            <CommonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Report">
                <AddReportForm onClose={() => setModalOpen(false)} />
            </CommonModal>
        </div>
    );
};

import React, { useState } from 'react';
import CommonTable from '../component/CommonTable';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CommonButton from '../component/CommonButton';
import CommonModal from '../component/CommonModal';
import CommonInput from '../component/CommonInput';
import PatientService from '../service/Patient/PatientService';
import { toast } from 'react-hot-toast';

const AddReportForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
            const formData = new FormData();
            formData.append('reportName', reportName);
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
