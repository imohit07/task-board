import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  const { user, initialized } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (!initialized) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Sign in</h1>
        <p className="login-hint">Use demo credentials: intern@demo.com / intern123</p>
        <LoginForm onSuccess={() => {}} />
      </div>
    </div>
  );
}
