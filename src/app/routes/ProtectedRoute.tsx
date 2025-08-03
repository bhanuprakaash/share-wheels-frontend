import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectIsAuthenticated} from "../../features/auth/selectors/authSelectors.ts";

interface ProtectedRoutesProps {
    redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRoutesProps> = ({redirectPath}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute;