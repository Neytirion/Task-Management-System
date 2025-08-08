import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white p-2 rounded">
      Выйти
    </button>
  );
}

export default LogoutButton;
