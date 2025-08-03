import type {AxiosError} from "axios";
import type {ErrorResponse} from "../../../shared/types/global.ts";

export type Gender = 'MALE' | 'FEMALE';

export interface User {
    user_id: string,
    email: string,
    phone_number: string,
    first_name: string,
    last_name: string,
    profile_picture: string,
    date_of_birth: string,
    gender: Gender,
    bio: string,
    is_active: boolean,
    wallet: number,
    hold_amount: number,
    fcm_tokens: string[],
    created_at: string,
}

export type UserID = User['user_id'];

//Get User
export interface GetUserData {
    user_id: UserID,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    profile_picture: string,
    date_of_birth: string,
    gender: Gender,
    bio: string,
    fcm_tokens: string[],
    is_active: boolean,
    wallet: number,
    hold_amount: number,
    created_at: string,
}

export interface GetUserResponse {
    data: GetUserData,
    success: boolean,
    message: string,
}

//Update User

export interface UpdateUserOptions {
    onSuccess?: (data: UpdateUserResponse, variables: { id: UserID, payload: UpdateUserPayload }) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null, variables: {
        id: UserID,
        payload: UpdateUserPayload
    }) => void;
}

export interface UpdateUserPayload {
    email?: string,
    phone_number?: string,
    first_name?: string,
    last_name?: string,
    profile_picture?: string,
    date_of_birth?: string,
    gender?: Gender,
    bio?: string,
}

export interface UpdateUserResponse {
    data: User,
    success: boolean,
    message: string,
}

//Delete User
export interface DeleteUserResponse {
    data: { user_id: UserID },
    success: boolean,
    message: string,
}

export interface DeleteUserOptions {
    onSuccess?: (data: DeleteUserResponse, variables: { id: UserID }) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null) => void;
}

// Update User Password
export interface UpdateUserPasswordPayload {
    currentPassword: string,
    newPassword: string,
}

export interface UpdateUserPasswordResponse {
    data: {
        user_id: UserID,
        email: User['email'],
    },
    success: boolean,
    message: string,
}

export interface UpdateUserPasswordOptions {
    onSuccess?: (data: UpdateUserPasswordResponse, variables: {
        id: UserID,
        payload: UpdateUserPasswordPayload
    }, context: unknown) => void;

    onError?: (error: AxiosError, errorData: ErrorResponse | null, variables: {
        id: UserID,
        payload: UpdateUserPasswordPayload
    }) => void;
}