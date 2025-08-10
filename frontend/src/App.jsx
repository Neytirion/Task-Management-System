import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import AdminPage from './pages/AdminPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Загрузка...</div>;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/tasks"
        element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin"
        element={
          isAuthenticated && role === 'admin' ? <AdminPage /> : <Navigate to="/login" />
        }
      />

      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}

export default App;
