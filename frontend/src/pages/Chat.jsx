import { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
  const { messages, addMessage, clearChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar historial al iniciar
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await api.get('/chat/history', {
          headers: { Authorization: `Bearer ${user?.access_token}` },
        });
        response.data.messages.forEach((msg) => addMessage(msg));
      } catch (error) {
        Toast.error('Failed to load chat history');
      }
    };
    loadChatHistory();
  }, [user, addMessage]);

  // Enviar mensaje al chatbot
  const handleSend = async () => {
    if (!input.trim()) {
      Toast.warning('Please enter a message');
      return;
    }

    const userMessage = { content: input, role: 'user' };
    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post(
        '/chat/send-message',
        { content: input },
        { headers: { Authorization: `Bearer ${user?.access_token}` } }
      );

      const botMessage = {
        content: response.data.message || 'No response from chatbot',
        role: 'bot',
      };
      addMessage(botMessage);
    } catch (error) {
      console.error(error);
      Toast.error('Failed to get response from chatbot');
    } finally {
      setLoading(false);
    }
  };

  // Limpiar el chat
  const handleClear = async () => {
    try {
      await api.post(
        '/chat/clear',
        {},
        { headers: { Authorization: `Bearer ${user?.access_token}` } }
      );
      clearChat();
      Toast.success('Chat history cleared');
    } catch (error) {
      Toast.error('Failed to clear chat history');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Contenedor Principal del Chat */}
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Mindfulness Chatbot</h2>
        <div className="h-80 overflow-y-auto border p-4 mb-4 rounded-md bg-gray-50">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.role === 'user' ? 'text-right text-blue-600' : 'text-left text-green-600'
                }`}
              >
                <p className="inline-block px-3 py-1 rounded-md bg-gray-200">
                  <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Start your conversation!</p>
          )}
        </div>

        {/* Input y Botones */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border rounded-md"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Chat;