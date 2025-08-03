import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    token: string;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: "",
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setAuthError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.token = "";
            state.isAuthenticated = false;
        }
    }
});

export const {setAuthenticated, setAuthToken, setAuthError, clearAuth} = authSlice.actions;
export default authSlice;