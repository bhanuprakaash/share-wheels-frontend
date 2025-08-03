import {lazy} from "react";

const SignupPage = lazy(() => import('./pages/SignupPage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'));

export {
    SignupPage,
    LoginPage,
}