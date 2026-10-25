import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const OrgSetup = () => {
  const [activeTab, setActiveTab] = useState('dept');
  const [depts, setDepts] = useState([]);
  const [desigs, setDesigs] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [deptForm, setDeptForm] = useState({ name: '', description: '' });
  const [leaveForm, setLeaveForm] = useState({ name: '', code: '', quota: '', paid: true });

  const fetchData = async () => {
    try {
      const [d, ds, lt, h] = await Promise.all([
        api.get('/org/departments'),
        api.get('/org/designations'),
        api.get('/org/leave-types'),
        api.get('/org/holidays')
      ]);
      setDepts(d.data);
      setDesigs(ds.data);
      setLeaveTypes(lt.data);
      setHolidays(h.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addDept = async (e) => {
    e.preventDefault();
    try {
      await api.post('/org/departments', deptForm);
      toast.success('Department added');
      setDeptForm({ name: '', description: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed');
    }
  };

  const addLeave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/org/leave-types', leaveForm);
      toast.success('Leave type added');
      setLeaveForm({ name: '', code: '', quota: '', paid: true });
      fetchData();
    } catch (error) {
      toast.error('Failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Organization Setup</h1>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('dept')} className={`px-4 py-2 rounded-lg ${activeTab === 'dept' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Departments</button>
        <button onClick={() => setActiveTab('leave')} className={`px-4 py-2 rounded-lg ${activeTab === 'leave' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Leave Types</button>
      </div>

      {activeTab === 'dept' && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <form onSubmit={addDept} className="flex gap-4 mb-4">
            <input placeholder="Department Name" value={deptForm.name} onChange={(e)=>setDeptForm({...deptForm,name:e.target.value})} className="px-4 py-2 border rounded-lg flex-1" required />
            <input placeholder="Description" value={deptForm.description} onChange={(e)=>setDeptForm({...deptForm,description:e.target.value})} className="px-4 py-2 border rounded-lg flex-1" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add</button>
          </form>
          <div className="space-y-2">
            {depts.map(d => <div key={d._id} className="p-3 border rounded-lg">{d.name}</div>)}
          </div>
        </div>
      )}

      {activeTab === 'leave' && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <form onSubmit={addLeave} className="flex gap-4 mb-4">
            <input placeholder="Name" value={leaveForm.name} onChange={(e)=>setLeaveForm({...leaveForm,name:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <input placeholder="Code" value={leaveForm.code} onChange={(e)=>setLeaveForm({...leaveForm,code:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <input placeholder="Quota" type="number" value={leaveForm.quota} onChange={(e)=>setLeaveForm({...leaveForm,quota:e.target.value})} className="px-4 py-2 border rounded-lg" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add</button>
          </form>
          <div className="space-y-2">
            {leaveTypes.map(l => <div key={l._id} className="p-3 border rounded-lg">{l.name} - {l.quota} days</div>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgSetup;
