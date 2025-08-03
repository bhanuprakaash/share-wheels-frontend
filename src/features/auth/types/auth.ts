import type {Gender, UserID} from "../../user/types/user.ts";

export interface CreateUserPayload {
    email: string,
    phone_number: string,
    password: string,
    first_name: string,
}

export interface CreateUserResponse {
    data: {
        user_id: string
    },
    message: string,
    success: boolean,
}

export interface LoginUserPayload {
    email: string,
    password: string,
}

export interface LoginUserResponseData {
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
    token: string,
    created_at: string,
}

export interface LoginUserResponse {
    data: LoginUserResponseData;
    success: boolean,
    message: string,
}
