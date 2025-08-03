import type {UserID} from "../types/user.ts";
import type {
    GetUserPreferencesResponse,
    UpdateUserPreferencePayload,
    UpdateUserPreferencesResponse,
} from "../types/userPreferences.ts";
import axiosInstance from "../../../shared/api/axiosInstance.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateUserPreferences = async (id: UserID, updatePayload: UpdateUserPreferencePayload): Promise<UpdateUserPreferencesResponse> => {
    const response = await axiosInstance.put(`${BASE_URL}/api/user/preferences/${id}`, updatePayload);
    return response.data;
}

export const getUserPreferences = async (id: string): Promise<GetUserPreferencesResponse> => {
    const response = await axiosInstance.get(`${BASE_URL}/api/user/preferences/${id}`);
    return response.data;
}