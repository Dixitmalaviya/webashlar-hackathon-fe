import { doFetch, REQUEST_METHODS } from "../axios";
import ADMIN_API_ENDPOINTS from "./AdminEndPoints";

export default {
    getDoctors: async (params?: { page?: number; limit?: number }) => {
        let url = ADMIN_API_ENDPOINTS.GET_DOCTORS;
        if (params) {
            const query = Object.entries(params)
                .filter(([_, v]) => v !== undefined && v !== null)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string | number)}`)
                .join('&');
            if (query) url += `?${query}`;
        }
        return doFetch(url, REQUEST_METHODS.GET);
    },
    getAllHospitals: async (params?: { page?: number; limit?: number }) => {
        let url = ADMIN_API_ENDPOINTS.GET_ALL_HOSPITALS;
        if (params) {
            const query = Object.entries(params)
                .filter(([_, v]) => v !== undefined && v !== null)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string | number)}`)
                .join('&');
            if (query) url += `?${query}`;
        }
        return doFetch(url, REQUEST_METHODS.GET);
    },
}
