import {useNavigate} from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };
  return (
    <button
      onClick={handleLogout}
      className="mt-6 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
    >
      Выйти
    </button>
  );
}