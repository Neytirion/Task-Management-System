import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      alert('Регистрация прошла успешно! Войдите в систему.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Ошибка регистрации: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Войти
        </Link>
      </p>
    </div>
  );
}
