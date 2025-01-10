import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import History from '../pages/History';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import GuestRoute from '../components/GuestRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🏠 Ruta Home */}
      <Route path="/" element={<Home />} />

      {/* 🔒 Rutas para Invitados */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 🔒 Rutas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* 🚫 Ruta No Encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;