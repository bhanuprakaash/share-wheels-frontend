import {Outlet} from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.tsx";

const ProtectedLayout = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="main-content flex-1 p-4 ml-72">
                <Outlet/>
            </div>
        </div>
    )
};

export default ProtectedLayout;