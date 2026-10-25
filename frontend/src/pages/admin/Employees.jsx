import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    departmentId: '', designationId: '', joinDate: '', basic: '', hra: '', medical: '', other: ''
  });

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/employees/register', form);
      toast.success(`Employee registered. Temp password: ${res.data.user.tempPassword}`);
      setShowForm(false);
      setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', departmentId: '', designationId: '', joinDate: '', basic: '', hra: '', medical: '', other: '' });
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {showForm ? 'Cancel' : 'Add Employee'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input placeholder="First Name" value={form.firstName} onChange={(e)=>setForm({...form,firstName:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <input placeholder="Last Name" value={form.lastName} onChange={(e)=>setForm({...form,lastName:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <input placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <input placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="px-4 py-2 border rounded-lg" />
            <input placeholder="Address" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="px-4 py-2 border rounded-lg" />
            <input placeholder="Department ID" value={form.departmentId} onChange={(e)=>setForm({...form,departmentId:e.target.value})} className="px-4 py-2 border rounded-lg" />
            <input placeholder="Designation ID" value={form.designationId} onChange={(e)=>setForm({...form,designationId:e.target.value})} className="px-4 py-2 border rounded-lg" />
            <input type="date" placeholder="Join Date" value={form.joinDate} onChange={(e)=>setForm({...form,joinDate:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <input placeholder="Basic Salary" type="number" value={form.basic} onChange={(e)=>setForm({...form,basic:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <input placeholder="HRA" type="number" value={form.hra} onChange={(e)=>setForm({...form,hra:e.target.value})} className="px-4 py-2 border rounded-lg" />
            <input placeholder="Medical" type="number" value={form.medical} onChange={(e)=>setForm({...form,medical:e.target.value})} className="px-4 py-2 border rounded-lg" />
            <input placeholder="Other" type="number" value={form.other} onChange={(e)=>setForm({...form,other:e.target.value})} className="px-4 py-2 border rounded-lg" />
            <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Register Employee</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.empCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.firstName} {emp.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{emp.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
