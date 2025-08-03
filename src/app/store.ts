import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/slices/authSlice.ts";
import userSlice from "../features/user/slices/userSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;