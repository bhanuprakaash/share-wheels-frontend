import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import InputField from "../../../shared/components/forms/InputField.tsx";
import Button from "../../../shared/components/forms/Button.tsx";
import Logo from "../../../shared/components/basic/Logo.tsx";
import userValidation from "../../../shared/utils/validation/userValidation.ts";
import {useCreateUser} from "../hooks/useAuth.ts";
import type {CreateUserPayload} from "../types/auth.ts";
import { toastError } from "../../../shared/utils/toast.ts";

const SignupPage = () => {
    const [createUserData, setCreateUserData] = useState<CreateUserPayload>({
        email: "",
        password: "",
        phone_number: "",
        first_name: "",
    });
    const userCreateMutation = useCreateUser();
    const navigate = useNavigate();

    const {validatePassword, validateEmail, validatePhone, validateName} = userValidation;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCreateUserData({
            ...createUserData,
            [name]: value
        })
    }

    const isValidCredentials = useMemo(() => {
        const {email, password, phone_number, first_name} = createUserData;
        return validateEmail(email) && validateName(first_name) && validatePhone(phone_number) && validatePassword(password);
    }, [createUserData, validateEmail, validateName, validatePassword, validatePhone])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidCredentials) {
            userCreateMutation.mutate(createUserData);
        } else {
            toastError("Invalid credentials");
        }
    }

    const handleNavigateLogin = () => {
        navigate("/login");
    }

    useEffect(() => {
        if (userCreateMutation.isSuccess) {
            navigate("/login");
        }
    }, [navigate, userCreateMutation.isSuccess]);

    return (
        <div
            className="relative flex size-full min-h-screen flex-col items-center justify-center bg-[#ffffff] p-4"
        >
            <div className="w-lg">
                <div className="bg-[#ffffff] rounded-lg shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Logo customClasses={"m-auto"}/>
                        <InputField
                            label="First name"
                            type="text"
                            value={createUserData.first_name}
                            id="first_name"
                            name="first_name"
                            onChange={handleChange}
                            placeholder="Dwight"
                            required={true}
                        />
                        <InputField
                            label="Email"
                            type="email"
                            value={createUserData.email}
                            placeholder="dwightschrute@example.com"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            required={true}
                        />
                        <InputField
                            label="password"
                            type="password"
                            value={createUserData.password}
                            placeholder="Dwight123@"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required={true}
                        />
                        <InputField
                            label="Phone"
                            type="tel"
                            value={createUserData.phone_number}
                            id="phone_number"
                            name="phone_number"
                            onChange={handleChange}
                            placeholder="+91 9876543210"
                            required={true}
                        />
                        <Button
                            variant={"primary"}
                            type="submit"
                            disabled={userCreateMutation.isPending}
                            customClasses={"text-base mt-2 font-semibold"}
                        >
                            {userCreateMutation.isPending ? 'Creating...' : 'Create'}
                        </Button>
                        <p className="text-xs m-auto">
                            Already Sharing Wheels? <span className="text-[#598C59] cursor-pointer"
                                                          onClick={handleNavigateLogin}>Login</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default SignupPage;

