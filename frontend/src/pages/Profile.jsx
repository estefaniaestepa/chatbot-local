import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Logout
      </button>
    </div>
  );
};

export default Profile;