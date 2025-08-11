import { useState } from "react";
import axios from "axios";
import EditableTaskList from "./EditableTaskList.jsx";

export default function UserCard({ user, tasks: initialTasks, onDelete }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(false);

  const handleTaskUpdate = async (id, newTitle) => {
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { title: newTitle }, { withCredentials: true });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      alert("Ошибка сохранения задачи");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskDelete = async (id) => {
    if (!window.confirm("Удалить задачу?")) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, { withCredentials: true });
      setTasks(tasks.filter(t => t._id !== id));
    } catch {
      alert("Ошибка удаления задачи");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-semibold">
            {user.name} ({user.email})
          </h3>
          <p>Роль: {user.role}</p>
        </div>
        <button
          onClick={() => onDelete(user._id)}
          className="text-red-600 hover:text-red-800"
          disabled={loading}
        >
          Удалить пользователя
        </button>
      </div>
      <div>
        <h4 className="font-semibold mb-1">Задачи:</h4>
        {tasks.length === 0 ? (
          <p>Нет задач</p>
        ) : (
          <EditableTaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} onTaskDelete={handleTaskDelete} />
        )}
      </div>
    </div>
  );
}

