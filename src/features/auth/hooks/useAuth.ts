import type { AxiosError } from "axios";
import { useDispatch } from "react-redux";

import type {
    CreateUserPayload,
    CreateUserResponse,
    LoginUserPayload,
    LoginUserResponse,
} from "../types/auth.ts";
import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser, registerFcmToken } from "../services/authApi.ts";
import { setUser } from "../../user/slices/userSlice.ts";
import { userKeys } from "../../user/hooks/useUser.ts";
import queryClient from "../../../shared/api/tanstackQueryClient.ts";
import { setAuthenticated, setAuthToken } from "../slices/authSlice.ts";
import { requestFcmToken } from "../config/firebase.ts";
import { toastSuccess, toastError } from "../../../shared/utils/toast.ts";

export const useCreateUser = () => {
    return useMutation<CreateUserResponse, AxiosError, CreateUserPayload>({
        mutationFn: createUser,
        onSuccess: (data) => {
            console.log(data);
            toastSuccess("Account created successfully");
        },
        onError: (err) => {
            console.log(err);
            toastError(err);
        }
    })
}

export const useLoginUser = () => {
    const dispatch = useDispatch();
    return useMutation<LoginUserResponse, AxiosError, { loginUserPayload: LoginUserPayload }>({
        mutationFn: ({ loginUserPayload }) => loginUser(loginUserPayload),
        onSuccess: (data) => {
            dispatch(setAuthenticated(true));
            dispatch(setAuthToken(data.data.token));
            dispatch(setUser(data.data));
            localStorage.setItem('authToken', data.data.token);
            void queryClient.invalidateQueries({ queryKey: userKeys.all })
            registerToken(data);
            toastSuccess("Logged in successfully");
        },
        onError: (err) => {
            console.log(err);
            toastError(err);
        }
    })
}

const registerToken = async (data: LoginUserResponse) => {
    try {
        const fcmToken = await requestFcmToken();

        if (fcmToken) {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error("No Auth Token found");
                return;
            }
            await registerFcmToken(data.data.user_id, fcmToken);
        }
    } catch (error) {
        console.error("Failed to sync FCM token", error);
    }
};