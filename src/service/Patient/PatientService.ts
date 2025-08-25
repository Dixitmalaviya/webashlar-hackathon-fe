import { doFetch, REQUEST_CONTENT_TYPE, REQUEST_METHODS } from "../axios";
import PATIENT_API_ENDPOINTS from "./PatientEndPoints";

export default {
    createPatientService: async (patientData: any) =>
        doFetch(PATIENT_API_ENDPOINTS.CREATE_PATIENT, REQUEST_METHODS.POST, patientData),
    getPatientService: async (id: string) =>
        doFetch(`${PATIENT_API_ENDPOINTS.GET_PATIENT}/${id}`, REQUEST_METHODS.GET),
    updatePatientService: async (id: string, patientData: any) =>
        doFetch(`${PATIENT_API_ENDPOINTS.UPDATE_PATIENT}/${id}`, REQUEST_METHODS.PUT, patientData),
    deletePatientService: async (id: string) =>
        doFetch(`${PATIENT_API_ENDPOINTS.DELETE_PATIENT}/${id}`, REQUEST_METHODS.DELETE),
    createPatientReportService: async (reportData: any) =>
        doFetch(PATIENT_API_ENDPOINTS.PATIENT_REPORT_CREATE, REQUEST_METHODS.POST, reportData, { contentType: REQUEST_CONTENT_TYPE.MULTIPART}),
    deletePatientReportService: async (Id: string) =>
        doFetch(`${PATIENT_API_ENDPOINTS.PATIENT_REPORT_DELETE}/${Id}`, REQUEST_METHODS.DELETE),
}
