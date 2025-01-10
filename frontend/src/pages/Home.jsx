import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Toast from '../components/Toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  useEffect(() => {
    Toast.info('Welcome to Mindfulness Chat!');
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sección Principal */}
      <section className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mindfulness Chatbot
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your companion for a calmer and more focused mind.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-blue-500 hover:bg-gray-200 font-semibold py-2 px-6 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-800 text-white hover:bg-gray-700 font-semibold py-2 px-6 rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Our Chatbot?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-md shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our chatbot is always available to help you, anytime, anywhere.
              </p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Mindful Conversations</h3>
              <p className="text-gray-600">
                Designed to guide you through stress-relieving exercises.
              </p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your conversations are encrypted and kept private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="py-16 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="mb-6">Take control of your mental health with our AI-powered chatbot.</p>
        <Link
          to="/register"
          className="bg-white text-blue-500 hover:bg-gray-200 font-semibold py-2 px-6 rounded-md"
        >
          Get Started
        </Link>
      </section>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;