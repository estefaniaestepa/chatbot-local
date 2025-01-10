import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Información Principal */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">MindfulnessChat</h3>
          <p className="text-sm mt-1">Your companion for a calmer mind.</p>
        </div>

        {/* Enlaces Rápidos */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-gray-400 text-sm">
            Home
          </Link>
          <Link to="/chat" className="hover:text-gray-400 text-sm">
            Chat
          </Link>
          <Link to="/profile" className="hover:text-gray-400 text-sm">
            Profile
          </Link>
          <Link to="/contact" className="hover:text-gray-400 text-sm">
            Contact
          </Link>
        </div>

        {/* Redes Sociales */}
        <div className="flex space-x-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
            <FaInstagram />
          </a>
          <a href="mailto:support@mindfulnesschat.com" className="hover:text-red-400">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className="text-center text-sm border-t border-gray-700 mt-4 pt-4">
        © {new Date().getFullYear()} MindfulnessChat. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;