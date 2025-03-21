import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
