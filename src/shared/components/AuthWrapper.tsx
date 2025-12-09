import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useMeQuery } from "../../features/user/hooks/useUser.ts";
import { clearAuth, setAuthenticated } from "../../features/auth/slices/authSlice.ts";
import { clearUser, setUser } from "../../features/user/slices/userSlice.ts";
import queryClient from "../api/tanstackQueryClient.ts";
import FullScreenLoader from "./basic/FullScreenLoader.tsx";

interface AuthWrapperProps {
    children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

    const { isLoading: isAuthCheckLoading, isError: isAuthCheckError, isSuccess, error, data } = useMeQuery();

    const authToken: string | null = localStorage.getItem("authToken") || null;

    useEffect(() => {
        if (!authToken) {

            dispatch(clearAuth())
            dispatch(clearUser());
            setIsAuthCheckComplete(true);

            const path = window.location.pathname;
            const authPaths = ["/login", "/signup"];

            if (!authPaths.includes(path)) {
                navigate("/login");
            }
        }
    }, [authToken, dispatch, navigate]);

    useEffect(() => {
        if (isSuccess && data.data) {
            dispatch(setAuthenticated(true));
            dispatch(setUser(data.data));
            setIsAuthCheckComplete(true);
        }
    }, [isSuccess, data, dispatch]);

    useEffect(() => {
        if (isAuthCheckError && error) {
            void queryClient.clear();
            dispatch(clearUser());
            dispatch(setAuthenticated(false));
        }
    }, [isAuthCheckError, dispatch, error]);

    if (isAuthCheckLoading || !isAuthCheckComplete) {
        return <FullScreenLoader />
    }

    return (
        <>{children}</>
    )
};

export default AuthWrapper;