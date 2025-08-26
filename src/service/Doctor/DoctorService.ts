import { doFetch, REQUEST_METHODS } from "../axios";
import DOCTOR_API_ENDPOINTS from "./DoctorEndPoints";

export default {
    getPatientsService: async () =>
        doFetch(DOCTOR_API_ENDPOINTS.GET_PATIENTS, REQUEST_METHODS.GET),
    getPatientsListService: async (paginationDetails: any) => {
        // paginationDetails: { page, limit, search }
        const params = [];
        if (paginationDetails?.page) params.push(`page=${paginationDetails.page}`);
        if (paginationDetails?.limit) params.push(`limit=${paginationDetails.limit}`);
        if (paginationDetails?.search) params.push(`search=${encodeURIComponent(paginationDetails.search)}`);
        const queryString = params.length ? `?${params.join('&')}` : '';
        return doFetch(`${DOCTOR_API_ENDPOINTS.GET_PATIENTS}${queryString}`, REQUEST_METHODS.GET);
    },
    getAllPatientsListService: async (paginationDetails: any) => {
        // paginationDetails: { page, limit, search }
        const params = [];
        if (paginationDetails?.page) params.push(`page=${paginationDetails.page}`);
        if (paginationDetails?.limit) params.push(`limit=${paginationDetails.limit}`);
        if (paginationDetails?.search) params.push(`search=${encodeURIComponent(paginationDetails.search)}`);
        const queryString = params.length ? `?${params.join('&')}` : '';
        return doFetch(`${DOCTOR_API_ENDPOINTS.GET_PATIENTS_LIST}${queryString}`, REQUEST_METHODS.GET);
    },
    getDoctorById: async (id: string) =>
        doFetch(`${DOCTOR_API_ENDPOINTS.GET_DOCTOR_BY_ID}/${id}`, REQUEST_METHODS.GET),
    deleteDoctorService: async (id: string) =>
        doFetch(`${DOCTOR_API_ENDPOINTS.DOCTORS}/${id}`, REQUEST_METHODS.DELETE),
    updateDoctorService: async (id: string, doctorData: any) =>
        doFetch(`${DOCTOR_API_ENDPOINTS.DOCTORS}/${id}`, REQUEST_METHODS.PUT, doctorData),
    getDoctorByHospitalService: async (Id: string) =>
        doFetch(`${DOCTOR_API_ENDPOINTS.DOCTORS_BY_HOSPITAL}/${Id}`, REQUEST_METHODS.GET),
}
