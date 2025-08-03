import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const handleLogout = () => {
    localStorage.removeItem('authToken');

    window.location.href = '/login';

    console.log('Session expired. Please login again.');
};

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {
    if ((error.response?.status === 403 || error.response?.status === 401) && handleLogout) {
        handleLogout();
    }
    return Promise.reject(error);
});

export default axiosInstance;