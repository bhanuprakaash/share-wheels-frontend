import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {LoginPage, SignupPage} from "../../features/auth";
import {ProfilePage, ProfileSettings, UserPreferenceSettings, PrivacyAndSecuritySettings} from "../../features/user";
import {selectIsAuthenticated} from "../../features/auth/selectors/authSelectors.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AuthRedirectRoute from "./AuthRedirect.tsx";
import ProtectedLayout from "../../shared/components/layouts/ProtectedLayout.tsx";

const AppRoutes = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated);
    console.log("isAuthenticated: ", isAuthenticated);

    return (
        <Routes>
            <Route element={<AuthRedirectRoute redirectPath={"/"}/>}>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Route>
            <Route element={<ProtectedRoute redirectPath={"/login"}/>}>
                <Route element={<ProtectedLayout/>}>

                    <Route path="/" element={<div>HOME</div>}/>

                    {/* profile routes */}
                    <Route path="/profile">
                        <Route index element={<ProfilePage/>}/>
                        <Route path="account-settings" element={<ProfileSettings/>}/>
                        <Route path="preference-settings" element={<UserPreferenceSettings/>}/>
                        <Route path="privacy-and-security-settings" element={<PrivacyAndSecuritySettings/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<div>404 - Page Not Found</div>}/>
        </Routes>
    )
};

export default AppRoutes;