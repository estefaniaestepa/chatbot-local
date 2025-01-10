import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    {/* Rutas Públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Rutas Protegidas */}
    <Route element={<ProtectedRoute />}>
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
    </Route>

    {/* Ruta para errores */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;