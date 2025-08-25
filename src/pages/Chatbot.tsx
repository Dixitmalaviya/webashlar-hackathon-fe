import React, { useState, useRef, useEffect } from 'react';
import CommonInput from '../component/CommonInput';
import CommonButton from '../component/CommonButton';
import PatientService from '../service/Patient/PatientService';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: 'Hello! I am your patient assistant. Set your Patient ID and ask your question.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const patientId = localStorage.getItem('patientId');
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    // Simulate assistant response
    // setTimeout(() => {
    //   let response = "I'm here to help — could you tell me more about your symptoms?";
    //   if (/improve.*life/i.test(userMessage.text)) {
    //     response = 'To improve your lifestyle, consider adopting a balanced diet, staying hydrated, exercising regularly, and getting enough sleep. Also, regular health check-ups can help monitor your well-being.';
    //   }
    //   setMessages(prev => [...prev, { sender: 'assistant', text: response }]);
    //   setLoading(false);
    // }, 800);
    const reqObj = {
      inputtext: input,
      patientId
    }
    console.log('userMessage', userMessage)
    const response = await PatientService.sendNewMessageService(reqObj);
    if (response.status === 200) {
      console.log('response', response)
      const conversationArr = response.data?.data?.conversation || [];
      const last = conversationArr.length > 0 ? conversationArr[conversationArr.length - 1] : null;
      const res = last?.outputtext || '';
      const assistantMessage: Message = { sender: 'assistant', text: res };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      const patientId = localStorage.getItem('patientId');
      if (patientId) {
        const response = await PatientService.fetchConversationService(patientId);
        if (response.status === 200) {
          const conversationArr = response.data?.data?.conversation || [];
          // For each conversation item, push user and assistant messages in order
          const messages: Message[] = [];
          conversationArr.forEach((msg: any) => {
            if (msg.inputtext) {
              messages.push({ sender: 'user', text: msg.inputtext });
            }
            if (msg.outputtext) {
              messages.push({ sender: 'assistant', text: msg.outputtext });
            }
          });
          setMessages(messages.length > 0 ? messages : [{ sender: 'assistant', text: 'Hello! I am your patient assistant. Set your Patient ID and ask your question.' }]);
        }
      }
    };
    fetchData();
  },[])

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="flex-shrink-0 px-6 py-4 bg-primary-500 text-primary text-xl font-bold border-b border-primary-200 text-center">
        Patient Chatbot
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg border text-sm whitespace-pre-line 
                ${msg.sender === 'user' ? 'bg-primary-50 text-primary-700 border-primary-300' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
              style={{ boxShadow: '0 2px 6px 0 rgba(0,0,0,0.04)' }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex items-center gap-2 px-4 py-4 bg-white border-t border-gray-200"
        onSubmit={e => { e.preventDefault(); handleSend(); }}
      >
        <CommonInput
          value={input}
          onChange={setInput}
          placeholder="Type your question or describe your symptoms..."
          className="mb-0 flex-1 bg-white text-gray-800 border-gray-300 focus:ring-primary-400 rounded-lg"
          disabled={loading}
        />
        <CommonButton
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg shadow-none"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Sending...' : 'Send'}
        </CommonButton>
      </form>
    </div>
  );
};

export default Chatbot;
