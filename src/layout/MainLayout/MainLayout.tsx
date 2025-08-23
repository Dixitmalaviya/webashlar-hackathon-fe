import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./MainLayout.css"; // Assuming you create a CSS file for styling

const MainLayout = () => {
    return (
        <div className="main-container">
            <div className="sidebar">
                <Sidebar/>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
