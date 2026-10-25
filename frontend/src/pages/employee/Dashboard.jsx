import { useState, useEffect } from 'react';
import api from '../../utils/api';

const EmployeeDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard/employee').then(res => setData(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-bold text-gray-900">{data?.kpis?.checkedIn ? (data?.kpis?.checkedOut ? 'Checked Out' : 'Checked In') : 'Not Checked In'}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved Leaves</p>
              <p className="text-2xl font-bold text-green-600">{data?.kpis?.approvedLeaves || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
