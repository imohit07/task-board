import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <h1 className="app-title">Task Board</h1>
      <div className="header-actions">
        <span className="user-email" aria-label="Logged in as">{user?.email}</span>
        <Button variant="secondary" onClick={logout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
