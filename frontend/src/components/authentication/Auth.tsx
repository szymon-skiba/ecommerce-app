import { useEffect, useState, useContext, FormEventHandler, useReducer } from "react";

// Project dependencies
import useApi from "../../service/api/auth-client";
import AuthContext from "../../service/auth/AuthContextProvider";
import { validatePasswordLength, validateEmailFormat } from "./validation";
import { AuthData } from "../../model/user";
import { useLocation } from "react-router-dom";
import LoginForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import Logo from "../common/logo";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import authReducer from "../../service/auth/authReducer";
import { GoogleAuth } from "../../model/googleAuth";

const Auth = () => {
    const [authData, setAuthData] = useState<AuthData>();
    const { error, request, setError } = useApi();
    const { globalLogInDispatch } = useContext(AuthContext);

    const location = useLocation();
    const currentPathArray = location.pathname.split('/');
    const isLogin = currentPathArray[currentPathArray.length - 1] === 'login';

    useEffect(() => {
        if (authData && "token" in authData) {
            globalLogInDispatch({
                token: authData.token,
                email: authData.email
            });
        }
    }, [authData, globalLogInDispatch]);

    const handleErrorResponse = (isLogin: boolean) => (error: Error) => {
        if (isLogin) {
            error.message = "Sign in failed!";
        } else {
            error.message = "Sign up failed!";
        }
        throw error;
    };

    const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userEmail = data.get("email");
        const userPassword = data.get("password");
        try {
            if (
                !validateEmailFormat(userEmail?.toString() || "") ||
                !validatePasswordLength(userPassword?.toString() || "")
            ) {
                throw new Error("Incorrect credential format!");
            }
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                }),
            };
            const endpoint = `/auth/${isLogin ? 'authenticate' : 'register'}`
            await request(endpoint, params, setAuthData, handleErrorResponse(isLogin));

            if (authData && "token" in authData) {

            }
        } catch (error: any) {
            if (isLogin) {
                error.message = "Sign in failed!";
                setError(error.message || error);
            } else {
                error.message = "Sign up failed!";
                setError(error.message || error);
            }
        }
    };

 
    const authGoogle = async (response: GoogleAuth) => {
        console.log(response)
        const clientId = response.clientId
        const credential = response.credential
        try {
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    credential:credential
                })
            };
            const endpoint = `/auth/google/${isLogin ? 'authenticate' : 'register'}`
            await request(endpoint, params, setAuthData, handleErrorResponse(isLogin));
        } catch (error: any) {
            if (isLogin) {
                error.message = "Sign in failed!";
                setError(error.message || error);
            } else {
                error.message = "Sign up failed!";
                setError(error.message || error);
            }
        }
    };

    return (
        <>
            <main className="flex items-center justify-center md:h-screen">
                <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                    <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                        <div className="w-32 text-white md:w-36">
                            <Logo />
                        </div>
                    </div>
                    {
                        isLogin
                            ? <LoginForm onSubmit={authHandler} onSubmitGoogle={authGoogle} />
                            : <RegisterForm onSubmit={authHandler} onSubmitGoogle={authGoogle} />
                    }
                    {error && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{error}</p>
                        </>
                    )}
                </div>

            </main>
        </>
    );
};

export default Auth;