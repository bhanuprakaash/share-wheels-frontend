import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { LoginPage, SignupPage } from "../../features/auth";
import {
  ProfilePage,
  ProfileSettings,
  UserPreferenceSettings,
  PrivacyAndSecuritySettings,
} from "../../features/user";
import {
  EditTrip,
  Rides,
  ScheduleTrip,
  SearchTrips,
  TripDetails,
  TripsPage,
} from "../../features/trip";
import { selectIsAuthenticated } from "../../features/auth/selectors/authSelectors.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AuthRedirectRoute from "./AuthRedirect.tsx";
import ProtectedLayout from "../../shared/components/layouts/ProtectedLayout.tsx";
import NotificationsPage from "../../features/notifications/pages/Notifications.tsx";

const AppRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <Routes>
      <Route element={<AuthRedirectRoute redirectPath={"/"} />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        <Route element={<ProtectedLayout />}>
          {/* <Route path="/" element={<SearchTrips />} /> */}

          {/* trip routes */}
          <Route path="/trip">
            <Route index element={<TripsPage />} />
            <Route path="schedule-trip" element={<ScheduleTrip />} />
            <Route path={`edit/:tripId`} element={<EditTrip />} />
            <Route path={`:tripId`} element={<TripDetails />} />
          </Route>

          <Route path="/rides">
            <Route index element={<Rides />} />
          </Route>

          <Route path="/search" element={<SearchTrips />} />
          <Route path="/" element={<Navigate to="/search" replace />} />

          {/* profile routes */}
          <Route path="/profile">
            <Route index element={<ProfilePage />} />
            <Route path="account-settings" element={<ProfileSettings />} />
            <Route
              path="preference-settings"
              element={<UserPreferenceSettings />}
            />
            <Route
              path="privacy-and-security-settings"
              element={<PrivacyAndSecuritySettings />}
            />
          </Route>

          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
