import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialAuthState = {
  isLoggedIn: false, // Default state is logged out
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // Action to log in the user
    login: (state) => {
      state.isLoggedIn = true;
    },
    // Action to log out the user
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Export actions for dispatching
export const { login, logout } = authSlice.actions;

// Selector to get the login status from the state
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// Export the reducer for the store
export const authReducer1 = authSlice.reducer;
