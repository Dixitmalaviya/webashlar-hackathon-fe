import axios, { type AxiosRequestConfig } from "axios";
const instance = axios.create();
const baseUrl = "https://tarlrei27f5w76nyxd4ydxwgn4.srv.us/api";

instance.interceptors.request.use(
    async (config) => {
        const value = await localStorage.getItem("auth");
        if (value) {
            config.headers.Authorization = `Bearer ${value}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error?.response?.status === 401) {
        // history.push("/login")
    }
    throw error.response;
    // throw error;
})

export const doFetch = (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    config?: {
        contentType?: string;
        showToast?: boolean;
    } & AxiosRequestConfig
) => {
    return instance({
        url: baseUrl + url,
        method,
        data,
        ...config
    });
};

export const REQUEST_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
} as const;

export const REQUEST_CONTENT_TYPE = {
    JSON: "application/json",
    MULTIPART: "multipart/form-data",
};