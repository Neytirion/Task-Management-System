import React from "react";
import UserCard from "./UserCard";

export default function UserList({ usersData, onDelete }) {
  if (usersData.length === 0) return <p>Пользователей нет.</p>;

  return (
    <>
      {usersData.map(({ user, tasks }) => (
        <UserCard key={user._id} user={user} tasks={tasks} onDelete={onDelete} />
      ))}
    </>
  );
}
