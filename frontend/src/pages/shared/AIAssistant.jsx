import { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/ai/chat', { message: input });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.answer }]);
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  const smartLeave = async () => {
    try {
      const res = await api.post('/ai/smart-leave', { text: input });
      toast.success(`Prefilled: ${res.data.prefill.type} leave ${res.data.prefill.startDate} to ${res.data.prefill.endDate}`);
    } catch (error) {
      toast.error('Failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Assistant</h1>
      <div className="bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500">AI is thinking...</div>}
        </div>
        <form onSubmit={send} className="p-4 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button type="button" onClick={smartLeave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Smart Leave
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
