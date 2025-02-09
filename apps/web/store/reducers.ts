// reducer.ts
import { createReducer } from "@reduxjs/toolkit";
import { loginRequest, loginSuccess, loginFailure } from "./action/actions";

interface AuthState {
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default authReducer;
