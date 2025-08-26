import { doFetch, REQUEST_METHODS } from "../axios";
import ADMIN_API_ENDPOINTS from "./AdminEndPoints";

export default {
    getDoctors: async () =>
        doFetch(ADMIN_API_ENDPOINTS.GET_DOCTORS, REQUEST_METHODS.GET),
}
