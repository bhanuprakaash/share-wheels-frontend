import {createSelector} from "@reduxjs/toolkit";
import type {RootState} from "../../../app/store.ts";

const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (auth) => auth.isAuthenticated
);

export const selectToken = createSelector(
    selectAuthState,
    (auth) => auth.token
);
