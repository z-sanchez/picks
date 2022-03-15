import Sidebar from "../layouts/Sidebar";
import {Outlet} from "react-router-dom";

function AppInterface() {
    return (
        <div className="container-fluid" id="appWrapper">
            <div className="row flex-row">
                <Sidebar/>
                <Outlet />
            </div>
        </div>
    );
}

export default AppInterface;