import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import useStore from './store/useStore';

function ProtectedRoute({ children }) {
  const role = useStore((s) => s.role);
  if (!role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const darkMode = useStore((s) => s.darkMode);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className={darkMode ? 'dark' : ''}>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                  <Header />
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
