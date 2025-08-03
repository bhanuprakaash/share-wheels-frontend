import type {UserID} from "./user.ts";
import type {ErrorResponse} from "../../../shared/types/global.ts";
import type {AxiosError} from "axios";

export type CommunicationPreference = 'CHATTY' | 'QUIET';

export interface UpdateUserPreferencesOptions {
    onSuccess?: (data: UpdateUserPreferencesResponse) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null) => void;
}

export interface UserPreferences {
    user_id: UserID,
    allow_smoking: boolean,
    music_genre: string[],
    has_pets: boolean,
    is_pet_friendly: boolean,
    communication_preference: CommunicationPreference,
    seat_preference: string,
}

export interface UpdateUserPreferencePayload {
    allow_smoking?: boolean,
    music_genre?: string[],
    has_pets?: boolean,
    is_pet_friendly?: boolean,
    communication_preference?: CommunicationPreference,
    seat_preference?: string,
}

export interface UpdateUserPreferencesResponse {
    data: UserPreferences,
    success: boolean,
    message: string
}

export interface GetUserPreferencesResponse {
    data: UserPreferences,
    success: boolean,
    message: string
}

