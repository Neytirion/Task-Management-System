import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true,
      });
      setUser({ id: res.data.id });
      setRole(res.data.role);
    } catch {
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email, password) => {
    await axios.post('http://localhost:5000/api/auth/login', { email, password }, {
      withCredentials: true,
    });
    await fetchMe();
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout', {}, {
      withCredentials: true,
    });
    setUser(null);
    setRole(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
