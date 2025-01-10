import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const GuestRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/chat" replace /> : <Outlet />;
};

export default GuestRoute;