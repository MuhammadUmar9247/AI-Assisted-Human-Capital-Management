import { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Attendance = () => {
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState(null);

  const checkIn = async () => {
    setLoading(true);
    try {
      const res = await api.post('/attendance/check-in', { source: 'web' });
      setAttendance(res.data);
      toast.success('Checked in successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const checkOut = async () => {
    setLoading(true);
    try {
      const res = await api.post('/attendance/check-out');
      setAttendance(res.data);
      toast.success('Checked out successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-out failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Attendance</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm max-w-md">
        <div className="space-y-4">
          <button
            onClick={checkIn}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Check In
          </button>
          <button
            onClick={checkOut}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Check Out
          </button>
          {attendance && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm"><strong>Status:</strong> {attendance.status}</p>
              <p className="text-sm"><strong>Check In:</strong> {attendance.checkInAt ? new Date(attendance.checkInAt).toLocaleTimeString() : '-'}</p>
              <p className="text-sm"><strong>Check Out:</strong> {attendance.checkOutAt ? new Date(attendance.checkOutAt).toLocaleTimeString() : '-'}</p>
              <p className="text-sm"><strong>Hours:</strong> {attendance.hoursWorked || 0}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
