import { useEffect, useState } from "react";
import { FaCalendarCheck, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("profile");
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item); // Update active item when clicked
    switch (item) {
      case "profile":
        navigate("/profile");
        break;
      case "appointment":
        navigate("/appointment");
        break;
      case "logout":
        navigate("/");
        break;
      default:
        break;
    }
  };

//   useEffect(() => {
    // navigate(activeItem);
//   }, []);

  return (
    <>
      {/* <div className="sidebar-main-container w-80 bg-white shadow-lg rounded-xl p-6 flex flex-col h-full"> */}
      <div className="sidebar-main-container w-80 bg-sidebarbg shadow-lg p-3 flex flex-col h-full">
        {/* <div className="text-2xl text-white font-bold mb-8 text-center">Smart Health</div> */}
        <div className="mb-5">
          <img
            src={"/sidebar-logo.png"}
            alt="Logo"
            className="inset-0 w-full h-30 object-contain opacity-100 z-0"
          />
        </div>

        {/* Top Navigation (Profile and Book Appointment) */}
        <nav className="flex flex-col space-y-4 text-lg flex-grow">
          <SidebarItem
            icon={<FaUser />}
            isActive={activeItem === "profile"}
            onClick={() => handleItemClick("profile")}
            label="Profile"
          />
          <SidebarItem
            icon={<FaCalendarCheck />}
            isActive={activeItem === "appointment"}
            onClick={() => handleItemClick("appointment")}
            label="Book Appointment"
          />
        </nav>

        {/* Bottom Navigation (Logout) */}
        <div className="flex flex-col space-y-4 text-lg mt-auto">
          <SidebarItem
            icon={<FaSignOutAlt />}
            isActive={activeItem === "logout"}
            onClick={() => handleItemClick("logout")}
            label="Logout"
          />
        </div>
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex text-white items-center gap-4 px-4 py-3 rounded-lg 
                ${isActive ? "bg-sidebarprimary" : "hover:bg-sidebarprimary"} 
                transition-all duration-200`}
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Sidebar;
