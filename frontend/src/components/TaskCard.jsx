import { useState } from "react";

export default function TaskCard({ task, onDelete, onEditSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    onEditSave(task._id, editTitle);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between mb-2 border-b border-gray-200 pb-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
          <button
            onClick={handleSave}
            className="ml-2 text-green-600 hover:text-green-800"
          >
            Сохранить
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditTitle(task.title);
            }}
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
              onClick={() => setIsEditing(true)}
              className="mr-2 text-yellow-500 hover:text-yellow-700"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
}
