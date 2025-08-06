import { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from "../components/LogoutButton.jsx";
import BackButton from "../components/BackButton.jsx";

export default function AdminPage() {
  const [usersData, setUsersData] = useState([]);
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', authHeader);
      setUsersData(res.data);
    } catch (err) {
      alert('Ошибка загрузки данных админа');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Удалить пользователя и все его задачи?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, authHeader);
      setUsersData(usersData.filter(u => u.user._id !== id));
    } catch {
      alert('Ошибка удаления пользователя');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BackButton to="/tasks"/>
      <h2 className="text-2xl font-bold mb-6 text-center">Админ-панель</h2>
      {usersData.length === 0 && <p>Пользователей нет.</p>}
      {usersData.map(({ user, tasks }) => (
        <div key={user._id} className="mb-8 p-4 border rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-xl font-semibold">{user.name} ({user.email})</h3>
              <p>Роль: {user.role}</p>
            </div>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="text-red-600 hover:text-red-800"
            >
              Удалить пользователя
            </button>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Задачи:</h4>
            {tasks.length === 0 ? (
              <p>Нет задач</p>
            ) : (
              <ul className="list-disc ml-5">
                {tasks.map(task => (
                  <li key={task._id}>{task.title} - {task.status}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
      <LogoutButton/>
    </div>
  );
}
