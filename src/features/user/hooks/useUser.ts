import {skipToken, useMutation, useQuery} from "@tanstack/react-query";
import {useDispatch} from "react-redux";

import type {AxiosError} from "axios";

import type {
    DeleteUserOptions,
    DeleteUserResponse,
    GetUserResponse,
    UpdateUserOptions,
    UpdateUserPasswordOptions,
    UpdateUserPasswordPayload,
    UpdateUserPasswordResponse,
    UpdateUserPayload,
    UpdateUserResponse,
    UserID
} from "../types/user.ts";
import type {
    ErrorResponse,
} from "../../../shared/types/global.ts";
import {deleteUser, fetchMe, getUser, resetPassword, updateUser} from "../services/userApi.ts";
import queryClient from "../../../shared/api/tanstackQueryClient.ts";
import {clearUser, setUser} from "../slices/userSlice.ts";
import {clearAuth} from "../../auth/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";

export const userKeys = {
    all: ['user'] as const,
    detail: (id: UserID) => [...userKeys.all, id] as const,
    me: () => [...userKeys.all, 'me'] as const,
}

export const useGetUser = (id: UserID | undefined) => {
    return useQuery<GetUserResponse, AxiosError, GetUserResponse, readonly ['user', UserID]>({
        queryKey: userKeys.detail(id!),
        queryFn: id ? () => getUser(id) : skipToken,
        enabled: !!id
    })
}

export const useMeQuery = () => {
    const authToken = localStorage.getItem('authToken');
    return useQuery<GetUserResponse, AxiosError, GetUserResponse, readonly ['user', 'me']>({
        queryKey: userKeys.me(),
        queryFn: fetchMe,
        enabled: !!authToken,
        staleTime: Infinity,
        retry: false,
    })
}

export const useLogoutUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('authToken');
        dispatch(clearUser());
        dispatch(clearAuth());
        void queryClient.clear();
        navigate('/login');
    };

    return {logout};
}

export const useUpdateUser = (options?: UpdateUserOptions) => {
    const dispatch = useDispatch();
    return useMutation<UpdateUserResponse, AxiosError, { id: UserID, payload: UpdateUserPayload }>({
        mutationFn: ({id, payload}) => updateUser(id, payload),
        onSuccess: (data, variables) => {
            void queryClient.invalidateQueries({queryKey: userKeys.detail(variables.id!)});
            void queryClient.invalidateQueries({queryKey: userKeys.me()});
            const responseData = data.data;
            if (responseData && responseData.user_id && responseData.user_id === variables.id) {
                dispatch(setUser(responseData));
            }
            options?.onSuccess?.(data, variables);
        },
        onError: (error, variables) => {
            console.log('Full error object:', error);

            let errorData: ErrorResponse | null = null;

            if (error.response?.data) {
                errorData = error.response.data as ErrorResponse;
            }

            options?.onError?.(error, errorData, variables);
        }
    })
}

export const useUpdatePassword = (options?: UpdateUserPasswordOptions) => {
    return useMutation<UpdateUserPasswordResponse, AxiosError, { id: UserID, payload: UpdateUserPasswordPayload }>({
        mutationFn: ({id, payload}) => resetPassword(id, payload),
        onSuccess: (data, variables, context) => {
            console.log(data);
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables) => {
            console.log(error);
            let errorData: ErrorResponse | null = null;
            if (error.response?.data) {
                errorData = error.response.data as ErrorResponse;
            }
            options?.onError?.(error, errorData, variables);
        }
    })
}

export const useDeleteUser = (options ?: DeleteUserOptions) => {
    const dispatch = useDispatch();
    return useMutation<DeleteUserResponse, AxiosError, { id: UserID }>({
        mutationFn: ({id}) => deleteUser(id),
        onSuccess: (data, variables) => {
            console.log(data)
            void queryClient.invalidateQueries({queryKey: userKeys.detail(variables.id!)});
            void queryClient.removeQueries({queryKey: userKeys.detail(variables.id!)});
            localStorage.removeItem('authToken');
            dispatch(clearUser());
            dispatch(clearAuth());
            options?.onSuccess?.(data, variables);
        },
        onError: (error) => {
            console.log(error);
            let errorData: ErrorResponse | null = null;
            if (error.response?.data) {
                errorData = error.response.data as ErrorResponse;
            }
            options?.onError?.(error, errorData)
        }
    })
}