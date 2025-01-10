import { useState, useEffect } from 'react';
import { login } from '../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useContext(AuthContext);

  // Mostrar mensaje de bienvenida
  useEffect(() => {
    Toast.info('Welcome to the Login Page!');
  }, []);

  // Manejar envío de formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Toast.warning('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);
      authLogin(data);
      Toast.success('Login successful! Redirecting...');
    } catch (error) {
      Toast.error(error.detail || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sección de Inicio de Sesión */}
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-400">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back!
          </h2>
          <form onSubmit={handleLogin}>
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Botón de Inicio de Sesión */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Redirección a Registro */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-blue-500 hover:underline"
            >
              Register here
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

export default Login;