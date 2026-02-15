import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import UserIndex from './pages/Users/Index';
import UserCreate from './pages/Users/Create';
import UserEdit from './pages/Users/Edit';
import UserShow from './pages/Users/Show';
import Register from './pages/Register';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UserIndex />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/users/:id" element={<UserShow />} />
            <Route path="/users/:id/edit" element={<UserEdit />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
