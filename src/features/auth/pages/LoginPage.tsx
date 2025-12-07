import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputField from "../../../shared/components/forms/InputField.tsx";
import Button from "../../../shared/components/forms/Button.tsx";
import Logo from "../../../shared/components/basic/Logo.tsx";
import userValidation from "../../../shared/utils/validation/userValidation.ts";
import type { LoginUserPayload } from "../types/auth.ts";
import { useLoginUser } from "../hooks/useAuth.ts";
import { selectIsAuthenticated } from "../selectors/authSelectors.ts";

const LoginPage = () => {
    const [loginCredentials, setLoginCredentials] = useState<LoginUserPayload>({
        email: '',
        password: '',
    });

    const loginMutation = useLoginUser();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    const { validateEmail, validatePassword } = userValidation;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginCredentials({
            ...loginCredentials,
            [name]: value,
        })
    }

    const isValidCredentials = useMemo(() => {
        const { email, password } = loginCredentials;
        return validateEmail(email) && validatePassword(password);
    }, [loginCredentials, validateEmail, validatePassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidCredentials) {
            loginMutation.mutate({ loginUserPayload: loginCredentials });
        }
    }

    const handleNavigate = () => {
        navigate("/reset-password");
    }

    useEffect(() => {
        if (loginMutation.isSuccess && isAuthenticated) {
            navigate("/");
        }
    }, [loginMutation.isSuccess, isAuthenticated, navigate]);

    return (
        <div
            className="relative flex size-full min-h-screen flex-col items-center justify-center bg-[#ffffff] p-4"
        >
            <div className="w-lg">
                <div className="bg-[#ffffff] rounded-lg shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Logo customClasses={"m-auto"} />
                        <InputField
                            name={"email"}
                            label={"Email"}
                            type={"text"}
                            value={loginCredentials.email}
                            placeholder={"example@mail.com"}
                            id={"email"}
                            required={true}
                            onChange={handleChange}
                        />
                        <InputField
                            label={"Password"}
                            type={"password"}
                            value={loginCredentials.password}
                            placeholder={"Dwight123@"}
                            id={"password"}
                            name={"password"}
                            onChange={handleChange}
                            required={true}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loginMutation.isPending}
                            customClasses={"text-base mt-2 font-semibold"}
                        >
                            {loginMutation.isPending ? 'Logging in...' : 'Login'}
                        </Button>
                        {
                            loginMutation.isError && (
                                <p>
                                    Login Failed: {loginMutation.error.message}
                                </p>
                            )
                        }
                        <p className="text-xs ml-auto cursor-pointer" onClick={handleNavigate}>
                            Forgot password?
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;