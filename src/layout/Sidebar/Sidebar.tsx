// // components/Sidebar.jsx
import { useState } from 'react';
import { FaCalendarCheck, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('profile');

    const handleItemClick = (item) => {
        setActiveItem(item); // Update active item when clicked
    };

    return (
        <>
            {/* <div className="sidebar-main-container w-80 bg-white shadow-lg rounded-xl p-6 flex flex-col h-full"> */}
            <div className="sidebar-main-container w-80 bg-sidebarbg shadow-lg p-6 flex flex-col h-full">
                <div className="text-2xl text-white font-bold mb-8 text-center">Smart Health</div>

                {/* Top Navigation (Profile and Book Appointment) */}
                <nav className="flex flex-col space-y-4 text-lg flex-grow">
                    <SidebarItem icon={<FaUser />}
                        isActive={activeItem === 'profile'}
                        onClick={() => handleItemClick('profile')}
                        label="Profile" />
                    <SidebarItem icon={<FaCalendarCheck />}
                        isActive={activeItem === 'appointment'}
                        onClick={() => handleItemClick('appointment')}
                        label="Book Appointment" />
                </nav>

                {/* Bottom Navigation (Logout) */}
                <div className="flex flex-col space-y-4 text-lg mt-auto">
                    <SidebarItem icon={<FaSignOutAlt />}
                        isActive={activeItem === 'logout'}
                        onClick={() => handleItemClick('logout')}
                        label="Logout" />
                </div>
            </div>
        </>
    );
};

const SidebarItem = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex text-white items-center gap-4 px-4 py-3 rounded-lg 
                ${isActive ? 'bg-primary' : 'hover:bg-primary'} 
                transition-all duration-200`}
    >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
    </button>
);

export default Sidebar;