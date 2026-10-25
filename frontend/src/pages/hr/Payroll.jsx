import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Payroll = () => {
  const [runs, setRuns] = useState([]);
  const [form, setForm] = useState({ month: new Date().getMonth()+1, year: new Date().getFullYear() });
  const [loading, setLoading] = useState(false);

  const fetchRuns = async () => {
    try {
      const res = await api.get('/payroll/runs');
      setRuns(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  const generate = async () => {
    setLoading(true);
    try {
      await api.post('/payroll/generate', form);
      toast.success('Payroll generated');
      fetchRuns();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const finalize = async (id) => {
    try {
      await api.put(`/payroll/${id}/finalize`);
      toast.success('Payroll finalized');
      fetchRuns();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Payroll</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
            <input type="number" min="1" max="12" value={form.month} onChange={(e)=>setForm({...form,month:e.target.value})} className="px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input type="number" value={form.year} onChange={(e)=>setForm({...form,year:e.target.value})} className="px-4 py-2 border rounded-lg" />
          </div>
          <button onClick={generate} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Generating...' : 'Generate Payroll'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {runs.map((run) => (
              <tr key={run._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{run.month}/{run.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${run.status === 'finalized' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {run.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{run.items?.length || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{run.totals?.net || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {run.status === 'draft' && (
                    <button onClick={() => finalize(run._id)} className="text-green-600 hover:text-green-900">Finalize</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
