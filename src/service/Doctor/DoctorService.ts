import { doFetch, REQUEST_METHODS } from "../axios";
import DOCTOR_API_ENDPOINTS from "./DoctorEndPoints";

export default {
    getPatientsService: async () =>
        doFetch(DOCTOR_API_ENDPOINTS.GET_PATIENTS, REQUEST_METHODS.GET),
    getPatientsListService: async () =>
        doFetch(DOCTOR_API_ENDPOINTS.GET_PATINTS_LIST, REQUEST_METHODS.GET),
    getDoctorById: async (id: string) =>
        doFetch(`${DOCTOR_API_ENDPOINTS.GET_DOCTOR_BY_ID}/${id}`, REQUEST_METHODS.GET),
    deleteDoctorService: async (id: string) =>
        doFetch(`${DOCTOR_API_ENDPOINTS.DOCTORS}/${id}`, REQUEST_METHODS.DELETE),
    updateDoctorService: async (id: string, doctorData: any) =>
        doFetch(`${DOCTOR_API_ENDPOINTS.DOCTORS}/${id}`, REQUEST_METHODS.PUT, doctorData),
}
