import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login';
import FirstRun from './pages/setup/FirstRun';
import Layout from './layouts/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import HRDashboard from './pages/hr/Dashboard';
import EmployeeDashboard from './pages/employee/Dashboard';
import Employees from './pages/admin/Employees';
import Attendance from './pages/employee/Attendance';
import LeaveApply from './pages/employee/LeaveApply';
import LeaveApprovals from './pages/hr/LeaveApprovals';
import Payroll from './pages/hr/Payroll';
import OrgSetup from './pages/admin/OrgSetup';
import AuditLog from './pages/admin/AuditLog';
import AIAssistant from './pages/shared/AIAssistant';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

const Dashboard = () => {
  const { user } = useAuth();
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'hr') return <HRDashboard />;
  return <EmployeeDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/first-run" element={<FirstRun />} />
          <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/employees" element={<PrivateRoute roles={['admin','hr']}><Layout><Employees /></Layout></PrivateRoute>} />
          <Route path="/attendance" element={<PrivateRoute roles={['employee']}><Layout><Attendance /></Layout></PrivateRoute>} />
          <Route path="/leave-apply" element={<PrivateRoute roles={['employee']}><Layout><LeaveApply /></Layout></PrivateRoute>} />
          <Route path="/leave-approvals" element={<PrivateRoute roles={['admin','hr']}><Layout><LeaveApprovals /></Layout></PrivateRoute>} />
          <Route path="/payroll" element={<PrivateRoute roles={['admin','hr']}><Layout><Payroll /></Layout></PrivateRoute>} />
          <Route path="/org-setup" element={<PrivateRoute roles={['admin']}><Layout><OrgSetup /></Layout></PrivateRoute>} />
          <Route path="/audit" element={<PrivateRoute roles={['admin']}><Layout><AuditLog /></Layout></PrivateRoute>} />
          <Route path="/ai" element={<PrivateRoute><Layout><AIAssistant /></Layout></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
