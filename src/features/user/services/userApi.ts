import axiosInstance from "../../../shared/api/axiosInstance.ts";
import type {
    DeleteUserResponse,
    GetUserResponse, UpdateUserPasswordPayload, UpdateUserPasswordResponse,
    UpdateUserPayload, UpdateUserResponse,
    UserID
} from "../types/user.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMe = async (): Promise<GetUserResponse> => {
    const response = await axiosInstance.get(`${BASE_URL}/api/user/verify/me`);
    return response.data;
}

export const getUser = async (id: UserID): Promise<GetUserResponse> => {
    const response = await axiosInstance.get(`${BASE_URL}/api/user/${id}`);
    return response.data;
}

export const updateUser = async (id: UserID, updateUserPayload: UpdateUserPayload): Promise<UpdateUserResponse> => {
    const response = await axiosInstance.patch(`${BASE_URL}/api/user/${id}`, updateUserPayload);
    return response.data;
}

export const resetPassword = async (id: UserID, passwordPayload: UpdateUserPasswordPayload): Promise<UpdateUserPasswordResponse> => {
    const response = await axiosInstance.patch(`${BASE_URL}/api/user/reset-password/${id}`, passwordPayload);
    return response.data;
}

export const deleteUser = async (id: UserID): Promise<DeleteUserResponse> => {
    const response = await axiosInstance.delete(`${BASE_URL}/api/user/${id}`);
    return response.data;
}