import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../api/auth-client";

// Project dependencies
import { AuthActionEnum } from "./authAction";
import authReducer, { AuthState, defaultAuthState } from "./authReducer";
import { AuthData, Details } from "../../model/user";

type AuthProviderProps = {
  children: React.ReactElement;
};

export type UserData = {
  token: string;
  email: string;
};

export interface AuthContext {
  authState: AuthState;
  globalLogInDispatch: (props: UserData) => void;
  globalLogOutDispatch: () => void;
}


// Auth context
const authCtx = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => { },
  globalLogOutDispatch: () => { },
});

export const AuthContextProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
  const navigate = useNavigate();
  const { error, request, setError } = useApi();
  const [details, setData] = useState<Details>();

  // Check if user detail is persisted, mostly catering for refreshing of the browser
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData: AuthState = JSON.parse(user);      
      authDispatch({ type: AuthActionEnum.LOG_IN, payload: { token: userData.token || '', email: userData.email || '', role: userData.role || '' } });
    }
  }, []);


  const globalLogInDispatch = useCallback(
    async (props: UserData) => {
      const { token } = props;

      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      };

      const response = await fetch("http://localhost:8080/api/v1/user/details",
        {
          method: params.method,
          headers: params.headers,
        }
      );
      if (!response.ok) {
        response.status === 403 && globalLogOutDispatch();
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();

      authDispatch({
        type: AuthActionEnum.LOG_IN,
        payload: {
          token,
          email: data.email,
          role: data.roles[0],
        },
      });

      navigate("/dashboard");
    },
    [navigate]
  );

  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null });
    navigate("/user/login");
  }, [navigate]);

  // context values to be passed down to children
  const ctx = {
    authState,
    globalLogInDispatch,
    globalLogOutDispatch,
  };

  return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>;
};

export default authCtx;