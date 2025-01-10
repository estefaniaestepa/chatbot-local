import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaRobot, FaClock } from 'react-icons/fa';

const History = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/chat/history', {
          headers: { Authorization: `Bearer ${user?.access_token}` },
        });
        setHistory(response.data);
        Toast.success('History loaded successfully!');
      } catch (error) {
        Toast.error('Failed to load chat history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sección Principal */}
      <section className="container mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Chat History</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading chat history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-500">No chat history found.</p>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[500px] border p-4 rounded-md">
            {history
              .slice()
              .reverse()
              .map((entry, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-md shadow-sm ${
                    entry.role === 'user'
                      ? 'bg-blue-100 border-l-4 border-blue-500'
                      : 'bg-green-100 border-l-4 border-green-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {entry.role === 'user' ? (
                        <FaUser className="text-blue-600" />
                      ) : (
                        <FaRobot className="text-green-600" />
                      )}
                      <span className="font-medium capitalize">
                        {entry.role === 'user' ? 'You' : 'Assistant'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <FaClock />
                      <span>
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700">{entry.content}</p>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default History;