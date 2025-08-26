import { doFetch, REQUEST_METHODS } from "../axios";
import HOSPITAL_API_ENDPOINTS from "./HospitalEndPoints";

export default {
    getHospitalOptionsService: async () =>
        doFetch(HOSPITAL_API_ENDPOINTS.GET_HOSPITAL_OPTIONS, REQUEST_METHODS.GET)
}
