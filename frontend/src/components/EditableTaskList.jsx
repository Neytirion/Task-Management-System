import {useState} from "react";

export default function EditableTaskList({ tasks, onTaskUpdate, onTaskDelete }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
  };

  const saveEdit = () => {
    onTaskUpdate(editingTaskId, editTitle);
    setEditingTaskId(null);
  };

  return (
    <ul className="list-disc ml-5">
      {tasks.map((task) => (
        <li key={task._id} className="mb-1 flex items-center justify-between">
          {editingTaskId === task._id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-gray-300 rounded px-1 py-0.5 mr-2"
              />
              <button onClick={saveEdit} className="text-green-600 hover:text-green-800 mr-2">
                Сохранить
              </button>
              <button onClick={cancelEdit} className="text-red-600 hover:text-red-800">
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
                  onClick={() => onTaskDelete(task._id)}
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
  );
}