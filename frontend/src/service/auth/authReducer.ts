import { Reducer } from "react";
import { AuthAction } from "./authAction";

export interface AuthState {
  isLoggedIn: boolean;
  token?: string;
  email?: string;
  role?: string; // Fix: Change type from string[] to string
};

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  // user successfully authenticated
  if (action.type === "LOG_IN") {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return {
      ...state,
      isLoggedIn: true,
      token: action.payload.token,
      email: action.payload.email,
      role: action.payload.role,
    };
  }

  // log out user
  if (action.type === "LOG_OUT") {
    localStorage.removeItem("user");
    return defaultAuthState;
  }

  return defaultAuthState;
};

export default authReducer;
