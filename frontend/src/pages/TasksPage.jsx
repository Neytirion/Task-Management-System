import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LogoutButton from "../components/LogoutButton.jsx";
import { useAuth } from '../context/AuthContext.jsx';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const { role } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      alert('Ошибка загрузки задач');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tasks',
        { title },
        {
          withCredentials: true,
        }
      );
      setTasks([...tasks, res.data]);
      setTitle('');
    } catch {
      alert('Ошибка добавления задачи');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert('Ошибка удаления задачи');
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { title: editTitle },
        {
          withCredentials: true,
        }
      );
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      cancelEdit();
    } catch {
      alert('Ошибка сохранения');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Мои задачи</h2>

      {/* Кнопка перехода в админку */}
      {role === 'admin' && (
        <div className="mb-4 text-center">
          <Link
            to="/admin"
            className="text-blue-600 hover:underline"
          >
            Перейти в админ-панель
          </Link>
        </div>
      )}

      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Новая задача"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Добавить
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between mb-2 border-b border-gray-200 pb-2"
          >
            {editId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-grow border border-gray-300 rounded px-2 py-1"
                />
                <button
                  onClick={() => saveEdit(task._id)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  Сохранить
                </button>
                <button
                  onClick={cancelEdit}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  Отмена
                </button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div>
                  <button
                    onClick={() => startEdit(task)}
                    className="mr-2 text-yellow-500 hover:text-yellow-700"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <LogoutButton />
      </div>
    </div>
  );
}
