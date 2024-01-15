import { useState, useCallback, useContext } from "react";

// Project dependencies
import AuthContext from "../auth/AuthContextProvider";

const BASE_URL = "http://10.0.2.2:8080/api/v1";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState, globalLogOutDispatch } = useContext(AuthContext);

  const request = useCallback(
    async (
      endpoint: string,
      params: { [key: string]: any },
      handleSuccessResponse: (data: any) => void,
      handleErrorResponse?: (error: Error) => void
    ) => {
      setLoading(true);
      setError(null);
      try {
        if (authState.isLoggedIn) {
          params.headers["Authorization"] = 'Bearer ' + authState.token;
        }
        const response = await fetch(BASE_URL + endpoint, 
          {
            method: params.method,
            headers: params.headers,
            body: params.body,
          }
        );
        if (!response.ok) {
          response.status === 403 && globalLogOutDispatch();
          const data = await response.json();
          throw new Error(data.error);
        }
        const data = await response.json();
        handleSuccessResponse && (await handleSuccessResponse(data));
      } catch (error: any) {
        if (error && error.message && error.message === "Unauthorized") {
          globalLogOutDispatch();
        }

        if (handleErrorResponse) {
          handleErrorResponse(error.message || error.error || error);
        } else {
          setError(error.message || error.error || error);
        }
      }

      setLoading(false);
    },
    
    [authState.isLoggedIn, authState.token, globalLogOutDispatch]
  );

  return {
    loading: loading,
    error: error,
    request: request,
    setError: setError,
  };
};

export default useApi;