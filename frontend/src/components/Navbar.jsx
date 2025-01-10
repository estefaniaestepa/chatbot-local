import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    FaUserCircle,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserPlus,
    FaHome,
    FaComments,
    FaClock
} from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* 🔗 Logo */}
                <Link
                    to={user ? '/chat' : '/'}
                    className="text-2xl font-bold hover:text-blue-200"
                >
                    MindfulnessChat
                </Link>

                {/* 📚 Menú de Navegación */}
                <ul className="flex space-x-6 items-center">
                    <li>
                        <Link
                            to={user ? '/chat' : '/'}
                            className="hover:text-blue-200 flex items-center gap-1"
                        >
                            <FaHome /> Home
                        </Link>
                    </li>
                    {user && (
                        <>
                            <li>
                                <Link to="/chat" className="hover:text-blue-200 flex items-center gap-1">
                                    <FaComments /> Chat
                                </Link>
                            </li>
                            <li>
                                <Link to="/chat/history" className="hover:text-blue-200 flex items-center gap-1">
                                    <FaClock /> History
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="hover:text-blue-200 flex items-center gap-1">
                                    <FaUserCircle /> Profile
                                </Link>
                            </li>
                        </>
                    )}

                </ul>

                {/* 🔑 Botones de Autenticación */}
                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 flex items-center gap-1"
                            >
                                <FaSignInAlt /> Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 flex items-center gap-1"
                            >
                                <FaUserPlus /> Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;