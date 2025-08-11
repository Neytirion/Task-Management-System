import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({}); // очищаем ошибки перед новым запросом

    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      if (err.response?.data?.errors) {
        const newErrors = {};
        err.response.data.errors.forEach(msg => {
          if (msg.toLowerCase().includes('имя')) newErrors.name = msg;
          if (msg.toLowerCase().includes('email')) newErrors.email = msg;
          if (msg.toLowerCase().includes('пароль')) newErrors.password = msg;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: 'Registration error. Try again.' });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
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
