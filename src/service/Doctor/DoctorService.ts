import { doFetch, REQUEST_METHODS } from "../axios";
import DOCTOR_API_ENDPOINTS from "./DoctorEndPoints";

export default {
    getPatientsService: async () =>
        doFetch(DOCTOR_API_ENDPOINTS.GET_PATIENTS, REQUEST_METHODS.GET)
}
