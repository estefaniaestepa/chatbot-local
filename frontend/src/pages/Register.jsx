import { useState, useEffect } from 'react';
import { register } from '../services/authService';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Toast.info('Welcome to the Registration Page!');
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      Toast.warning('All fields are required');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      Toast.success('Registration successful! Please login.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      Toast.error(error.detail || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sección de Registro */}
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-400">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleRegister}>
            {/* Nombre de usuario */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Correo Electrónico */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Contraseña */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Botón de Registro */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Redirección a Login */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-purple-500 hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </section>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Register;