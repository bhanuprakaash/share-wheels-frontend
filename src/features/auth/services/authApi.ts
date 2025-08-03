import type {
    CreateUserPayload,
    CreateUserResponse,
    LoginUserPayload,
    LoginUserResponse
} from "../types/auth.ts";
import axiosInstance from "../../../shared/api/axiosInstance.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createUser = async (newUser: CreateUserPayload): Promise<CreateUserResponse> => {
    const response = await axiosInstance.post(`${BASE_URL}/api/user/signup`, newUser);
    return response.data;
}

export const loginUser = async (loginUserPayload: LoginUserPayload): Promise<LoginUserResponse> => {
    const response = await axiosInstance.post(`${BASE_URL}/api/user/login`, loginUserPayload);
    return response.data;
}