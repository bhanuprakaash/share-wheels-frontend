import {createSelector} from "@reduxjs/toolkit";
import type {RootState} from "../../../app/store.ts";

const selectUserState = (state: RootState) => state.user;

export const selectUser = createSelector(
    selectUserState,
    (userState) => userState.user,
);

export const selectUserId = createSelector(
    selectUserState,
    (userState) => userState.user?.user_id
);