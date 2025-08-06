import {useNavigate} from 'react-router-dom';

export default function BackButton({to}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Назад
    </button>
  );
}
