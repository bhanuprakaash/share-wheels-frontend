import {skipToken, useMutation, useQuery} from "@tanstack/react-query";
import type {AxiosError} from "axios";

import type {UserID} from "../types/user.ts";
import {getUserPreferences, updateUserPreferences} from "../services/userPreferencesApi.ts";
import type {
    GetUserPreferencesResponse,
    UpdateUserPreferencePayload, UpdateUserPreferencesOptions,
    UpdateUserPreferencesResponse
} from "../types/userPreferences.ts";
import type {ErrorResponse} from "../../../shared/types/global.ts";
import queryClient from "../../../shared/api/tanstackQueryClient.ts";

export const userPreferencesQueryKeys = {
    all: ['user_preferences'] as const,
    preferences: (id: UserID) => [...userPreferencesQueryKeys.all, id] as const,
}

export const useGetUserPreferences = (id: UserID | undefined) => {
    return useQuery<GetUserPreferencesResponse, AxiosError, GetUserPreferencesResponse, readonly ['user_preferences', UserID]>({
        queryKey: userPreferencesQueryKeys.preferences(id!),
        queryFn: id ? () => getUserPreferences(id) : skipToken,
        enabled: !!id
    })
}

export const useUpdateUserPreferences = (options: UpdateUserPreferencesOptions) => {
    return useMutation<UpdateUserPreferencesResponse, AxiosError, {
        id: UserID,
        payload: UpdateUserPreferencePayload
    }>({
        mutationFn: ({id, payload}) => updateUserPreferences(id, payload),
        onSuccess: (data, variables) => {
            console.log(data);
            void queryClient.invalidateQueries({queryKey: userPreferencesQueryKeys.preferences(variables.id!)});
            options?.onSuccess?.(data);
        },
        onError: (error) => {
            console.log(error);
            let errorData: ErrorResponse | null = null;

            if (error.response?.data) {
                errorData = error.response.data as ErrorResponse;
            }

            options?.onError?.(error, errorData);
        }
    })
}