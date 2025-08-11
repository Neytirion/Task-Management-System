import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await login(email, password);
      navigate('/tasks');
    } catch (err) {
      if (err.response?.data?.errors) {
        const newErrors = {};
        err.response.data.errors.forEach(msg => {
          if (msg.toLowerCase().includes('email')) newErrors.email = msg;
          if (msg.toLowerCase().includes('пароль')) newErrors.password = msg;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: 'incorrect email or password. Try again.' });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
          Войти
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Нет аккаунта?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
