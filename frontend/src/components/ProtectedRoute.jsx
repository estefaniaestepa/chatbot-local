import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute: Protege rutas que requieren autenticación.
 * - Si el usuario está autenticado, renderiza el contenido protegido (Outlet).
 * - Si no está autenticado, redirige al login.
 */
const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;