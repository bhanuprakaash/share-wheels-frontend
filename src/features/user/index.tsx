import {lazy} from "react";

const ProfilePage = lazy(() => import('./pages/profile/ProfilePage.tsx'));
const ProfileSettings = lazy(() => import('./pages/profile/ProfileSettings.tsx'));
const UserPreferenceSettings = lazy(() => import('./pages/profile/UserPreferenceSettings.tsx'));
const PrivacyAndSecuritySettings = lazy(() => import('./pages/profile/PrivacyAndSecuritySettings.tsx'));

export {
    ProfilePage,
    ProfileSettings,
    UserPreferenceSettings,
    PrivacyAndSecuritySettings,
}