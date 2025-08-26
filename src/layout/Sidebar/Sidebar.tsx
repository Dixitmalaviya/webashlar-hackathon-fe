// // components/Sidebar.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaHospital, FaHospitalUser, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Sidebar.css';
import AvtarImg from '../../assets/Avtar.svg';
import patientServices from '../../service/Patient/PatientService'


type SidebarItemKey = 'profile' | 'appointment' | 'patients' | 'logout' | 'chatbot' | 'analysis' | 'doctors' | 'hospitals';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<SidebarItemKey>('profile');
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    // const { getPatientService } = patientServices;
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState<string | null>('patient');
    console.log(activeItem)
    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setActiveItem(location.pathname.split('/')[1] as SidebarItemKey);
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    const handleItemClick = (item: SidebarItemKey) => {
        setActiveItem(item);
        // Navigate to the corresponding route
        if (item === 'profile') navigate('/profile');
        else if (item === 'appointment') navigate('/appointment');
        else if (item === 'patients') navigate('/patients');
        else if (item === 'chatbot') navigate('/chatbot');
        else if (item === 'analysis') navigate('/analysis');
        else if (item === 'doctors') navigate('/doctors');
        else if (item === 'hospitals') navigate('/hospitals');
        else if (item === 'logout') {
            localStorage.removeItem('auth');
            navigate('/')
        };
    };

    const sidebarItems: SidebarItemConfig[] = [
        {
            key: 'profile',
            icon: <FaUser />,
            label: 'Me',
            roles: ['patient'],
        },
        {
            key: 'appointment',
            icon: <FaCalendarCheck />,
            label: 'Book Appointment',
            roles: ['patient'],
        },
        {
            key: 'patients',
            icon: <FaUsers />,
            label: 'Patients',
            roles: ['doctor', 'admin'],
        },
        {
            key: 'chatbot',
            icon: <span role="img" aria-label="Chatbot">🧑‍⚕️</span>,
            label: 'Chatbot',
            roles: ['patient', 'doctor', 'admin'],
        },
        {
            key: 'analysis',
            icon: <span role="img" aria-label="Analysis">🧑‍⚕️</span>,
            label: 'Analysis',
            roles: ['doctor', 'admin'],
        },
        {
            key: 'doctors',
            icon: <FaHospitalUser />,
            label: 'Doctors',
            roles: ['admin'],
        },
        {
            key: 'hospitals',
            icon: <FaHospital />,
            label: 'Hospitals',
            roles: ['admin'],
        },
    ];

    useEffect(() => {
        if (localStorage.getItem('patientId')) {
            const patientId: string = localStorage.getItem('patientId') || '';
            patientServices.getPatientService(patientId).then((res) => {
                console.log("Patient res", res)
                setUserName(res.data.patient.fullName);
            }).catch(error => console.error("error fetching patient", error))
        }
    })

    return (
        <div
            className={`sidebar-main-container ${collapsed ? "w-20 p-2" : "w-80 p-6"
                } bg-sidebarbg flex flex-col h-full transition-all duration-300 relative`}
        >
            <div className="mb-8 flex items-center pl-4 pt-4 min-h-[48px]">
                {!collapsed && (
                    <div className="flex items-center justify-between w-full">
                        <img
                            src={"/sidebar-logo.png"}
                            alt="Logo"
                            className="h-8 w-auto object-contain opacity-100 z-0"
                            style={{ maxWidth: 180 }}
                        />
                        {/* <span className="ml-2 text-white font-bold text-lg tracking-wide select-none">HEALTH SYNC</span> */}
                        <button
                            className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#2C3440] text-white shadow-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-[#3A4250] transition-all duration-200"
                            onClick={() => setCollapsed(true)}
                            title="Collapse"
                            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
                        >
                            <FiChevronLeft size={24} />
                        </button>
                    </div>
                )}
                {collapsed && (
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2C3440] text-white shadow-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-[#3A4250] transition-all duration-200"
                        onClick={() => setCollapsed(false)}
                        title="Expand"
                        style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
                    >
                        <FiChevronRight size={24} />
                    </button>
                )}
            </div>
            {/* <div className={`${collapsed ? 'text-xl mb-8 text-center' : 'text-2xl mb-8 text-center'} text-white font-bold`}>{!collapsed && 'Smart Health'}</div> */}
            {/* Top Navigation (Profile and Book Appointment) */}
            <nav
                className={`flex flex-col ${collapsed ? "gap-4 mt-16" : "space-y-4"
                    } text-lg flex-grow`}
            >
                {sidebarItems
                    .filter(item => role && item.roles.includes(role))
                    .map(item => (
                        <SidebarItem
                            key={item.key}
                            icon={item.icon}
                            isActive={activeItem === item.key}
                            onClick={() => handleItemClick(item.key)}
                            label={collapsed ? "" : item.label}
                            collapsed={collapsed}
                        />
                    ))}
            </nav>
            {/* Bottom Navigation (Logout) */}
            <div
                className={`flex flex-col ${collapsed ? "gap-8" : "space-y-4"
                    } text-lg mt-auto`}
            >
                <div className="flex gap-4 px-3 text-white items-center">
                    <img
                        src={AvtarImg}
                        alt="Avtar"
                        className="h-8 w-auto object-contain opacity-100 z-0"
                        style={{ maxWidth: 180 }}
                    />
                    <span>{collapsed ? "" : userName}</span>
                </div>
                <SidebarItem
                    icon={<FaSignOutAlt />}
                    isActive={activeItem === "logout"}
                    onClick={() => handleItemClick("logout")}
                    label={collapsed ? "" : "Logout"}
                    collapsed={collapsed}
                />
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
