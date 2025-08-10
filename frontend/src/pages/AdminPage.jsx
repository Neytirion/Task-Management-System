import {useEffect, useState} from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton.jsx";
import BackButton from "../components/BackButton.jsx";
import UserList from "../components/UserList.jsx";
import Pagination from "../components/Pagination.jsx";

export default function AdminPage() {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(4)

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        withCredentials: true,
      });
      setUsersData(res.data);
    } catch (err) {
      alert("Ошибка загрузки данных админа");
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = usersData.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Удалить пользователя и все его задачи?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsersData(usersData.filter((u) => u.user._id !== id));
    } catch {
      alert("Ошибка удаления пользователя");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BackButton to="/tasks" />
      <h2 className="text-2xl font-bold mb-6 text-center">Админ-панель</h2>
      <UserList
        usersData={currentPosts}
        onDelete={handleDeleteUser}
      />
      <Pagination
        totalPosts={usersData.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <LogoutButton />
    </div>
  );
}
