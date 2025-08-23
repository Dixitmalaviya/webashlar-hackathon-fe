// // components/Sidebar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Sidebar.css';


type SidebarItemKey = 'profile' | 'appointment' | 'patients' | 'logout';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<SidebarItemKey>('profile');
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleItemClick = (item: SidebarItemKey) => {
        setActiveItem(item);
        // Navigate to the corresponding route
        if (item === 'profile') navigate('/profile');
        else if (item === 'appointment') navigate('/appointment');
        else if (item === 'patients') navigate('/patients');
        else if (item === 'logout') navigate('/logout');
    };

    return (
        <div className={`sidebar-main-container ${collapsed ? 'w-20 p-2' : 'w-80 p-6'} bg-sidebarbg flex flex-col h-full transition-all duration-300 relative`}>
            <button
                className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#2C3440] text-white shadow-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary z-20 transition-all duration-200 border border-[#3A4250]`}
                onClick={() => setCollapsed((prev) => !prev)}
                title={collapsed ? 'Expand' : 'Collapse'}
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
            >
                {collapsed ? (
                    <FiChevronRight size={24} />
                ) : (
                    <FiChevronLeft size={24} />
                )}
            </button>
            <div className={`${collapsed ? 'text-xl mb-8 text-center' : 'text-2xl mb-8 text-center'} text-white font-bold`}>{!collapsed && 'Smart Health'}</div>
            {/* Top Navigation (Profile and Book Appointment) */}
            <nav className={`flex flex-col ${collapsed ? 'gap-4 mt-16' : 'space-y-4'} text-lg flex-grow`}>
                <SidebarItem icon={<FaUser />} isActive={activeItem === 'profile'} onClick={() => handleItemClick('profile')} label={collapsed ? '' : 'Profile'} collapsed={collapsed} />
                <SidebarItem icon={<FaCalendarCheck />} isActive={activeItem === 'appointment'} onClick={() => handleItemClick('appointment')} label={collapsed ? '' : 'Book Appointment'} collapsed={collapsed} />
                <SidebarItem icon={<FaUsers />} isActive={activeItem === 'patients'} onClick={() => handleItemClick('patients')} label={collapsed ? '' : 'Patients'} collapsed={collapsed} />
            </nav>
            {/* Bottom Navigation (Logout) */}
            <div className={`flex flex-col ${collapsed ? 'gap-8' : 'space-y-4'} text-lg mt-auto`}>
                <SidebarItem icon={<FaSignOutAlt />} isActive={activeItem === 'logout'} onClick={() => handleItemClick('logout')} label={collapsed ? '' : 'Logout'} collapsed={collapsed} />
            </div>
        </div>
    );
};

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick, collapsed }) => (
    <button
        onClick={onClick}
        className={`flex text-white items-center ${collapsed ? 'justify-center' : 'gap-4 px-4'} py-3 rounded-lg 
                ${isActive ? 'bg-primary' : 'hover:bg-primary'} 
                transition-all duration-200`}
        style={collapsed ? { width: '100%' } : {}}
    >
        <span className="text-xl">{icon}</span>
        {!collapsed && <span>{label}</span>}
    </button>
);

export default Sidebar;
