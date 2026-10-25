import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Users, Calendar, FileText } from 'lucide-react';

const HRDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard/hr').then(res => setData(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">HR Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{data?.kpis?.headcount || 0}</p>
            </div>
            <Users className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">{data?.kpis?.presentToday || 0}</p>
            </div>
            <Calendar className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Leaves</p>
              <p className="text-2xl font-bold text-orange-600">{data?.kpis?.pendingLeaves || 0}</p>
            </div>
            <FileText className="text-orange-600" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
