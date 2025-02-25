import { createAction } from "@reduxjs/toolkit";

export const loginRequest = createAction("LOGIN_REQUEST");
export const loginSuccess = createAction<{ email: string }>("LOGIN_SUCCESS");
export const loginFailure = createAction<string>("LOGIN_FAILURE");
