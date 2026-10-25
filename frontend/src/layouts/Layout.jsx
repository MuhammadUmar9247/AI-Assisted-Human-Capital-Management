import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Users, Calendar, FileText, DollarSign, Settings, Shield, Bot, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menu = {
    admin: [
      { name: 'Dashboard', path: '/', icon: Home },
      { name: 'Employees', path: '/employees', icon: Users },
      { name: 'Leave Approvals', path: '/leave-approvals', icon: FileText },
      { name: 'Payroll', path: '/payroll', icon: DollarSign },
      { name: 'Org Setup', path: '/org-setup', icon: Settings },
      { name: 'Audit Log', path: '/audit', icon: Shield },
      { name: 'AI Assistant', path: '/ai', icon: Bot },
    ],
    hr: [
      { name: 'Dashboard', path: '/', icon: Home },
      { name: 'Employees', path: '/employees', icon: Users },
      { name: 'Leave Approvals', path: '/leave-approvals', icon: FileText },
      { name: 'Payroll', path: '/payroll', icon: DollarSign },
      { name: 'AI Assistant', path: '/ai', icon: Bot },
    ],
    employee: [
      { name: 'Dashboard', path: '/', icon: Home },
      { name: 'Attendance', path: '/attendance', icon: Calendar },
      { name: 'Apply Leave', path: '/leave-apply', icon: FileText },
      { name: 'AI Assistant', path: '/ai', icon: Bot },
    ]
  };

  const items = menu[user?.role] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-blue-600">HCM Lite</h1>
            <p className="text-sm text-gray-500 mt-1">{user?.role?.toUpperCase()}</p>
          </div>
          <nav className="p-4">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mb-1"
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg mt-4 w-full"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
