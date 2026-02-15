import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { Input } from './Input';

export function LoginForm({ onSuccess }) {
  const { login, rememberedEmail, rememberMeDefault } = useAuth();
  const [email, setEmail] = useState(rememberedEmail || '');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(rememberMeDefault);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const eTrim = (email || '').trim();
    const pTrim = (password || '').trim();
    if (!eTrim) {
      setError('Email is required.');
      return;
    }
    if (!pTrim) {
      setError('Password is required.');
      return;
    }
    if (!login(eTrim, password, remember)) {
      setError('Invalid email or password.');
      return;
    }
    onSuccess?.();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="intern@demo.com"
        required
        autoComplete="email"
        error={error && error.includes('Email') ? error : undefined}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        required
        autoComplete="current-password"
        error={error && error.includes('Password') ? error : undefined}
      />
      {error && !error.includes('Email') && !error.includes('Password') && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          aria-label="Remember me"
        />
        Remember me
      </label>
      <Button type="submit" className="login-submit">
        Sign in
      </Button>
    </form>
  );
}
