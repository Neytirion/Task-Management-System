import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onDelete, onEditSave }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEditSave={onEditSave}
        />
      ))}
    </ul>
  );
}
