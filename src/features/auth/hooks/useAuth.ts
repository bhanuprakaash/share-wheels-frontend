import type {AxiosError} from "axios";
import {useDispatch} from "react-redux";

import type {
    CreateUserPayload,
    CreateUserResponse,
    LoginUserPayload,
    LoginUserResponse,
} from "../types/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {createUser, loginUser} from "../services/authApi.ts";
import {setUser} from "../../user/slices/userSlice.ts";
import {userKeys} from "../../user/hooks/useUser.ts";
import queryClient from "../../../shared/api/tanstackQueryClient.ts";
import {setAuthenticated, setAuthToken} from "../slices/authSlice.ts";

export const useCreateUser = () => {
    return useMutation<CreateUserResponse, AxiosError, CreateUserPayload>({
        mutationFn: createUser,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);
        }
    })
}

export const useLoginUser = () => {
    const dispatch = useDispatch();
    return useMutation<LoginUserResponse, AxiosError, { loginUserPayload: LoginUserPayload }>({
        mutationFn: ({loginUserPayload}) => loginUser(loginUserPayload),
        onSuccess: (data) => {
            dispatch(setAuthenticated(true));
            dispatch(setAuthToken(data.data.token));
            dispatch(setUser(data.data));
            localStorage.setItem('authToken', data.data.token);
            void queryClient.invalidateQueries({queryKey: userKeys.all})
        },
        onError: (err) => {
            console.log(err);
        }
    })
}