import { doFetch, REQUEST_METHODS } from "../axios";
import AUTH_API_ENDPOINTS from "./AuthEndPoints";

export default {
    loginService: async (email: string, password: string) =>
        doFetch(AUTH_API_ENDPOINTS.LOGIN, REQUEST_METHODS.POST, { email, password }),
    registerService: async (userData: any) =>
        doFetch(AUTH_API_ENDPOINTS.REGISTER, REQUEST_METHODS.POST, userData),
    registerDoctorService: async (userData: any) =>
        doFetch(AUTH_API_ENDPOINTS.REGISTER_DOCTOR, REQUEST_METHODS.POST, userData),
    registerHospitalService: async (hospitalData: any) =>
        doFetch(AUTH_API_ENDPOINTS.REGISTER_HOSPITAL, REQUEST_METHODS.POST, hospitalData),
    getUserById: async () =>
        doFetch(`${AUTH_API_ENDPOINTS.USER}`, REQUEST_METHODS.GET),
    deleteUserService: async () =>
        doFetch(`${AUTH_API_ENDPOINTS.USER}`, REQUEST_METHODS.DELETE),
    updateUserService: async (doctorData: any) =>
        doFetch(`${AUTH_API_ENDPOINTS.USER}`, REQUEST_METHODS.PUT, doctorData),
}
