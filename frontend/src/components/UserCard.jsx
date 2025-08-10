export default function UserCard({ user, tasks, onDelete }) {
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
            {tasks.map((task) => (
              <li key={task._id}>
                {task.title} - {task.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
