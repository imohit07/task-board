import { STORAGE_KEYS, DEMO_CREDENTIALS } from './constants';

export function validateCredentials(email, password) {
  const e = (email || '').trim().toLowerCase();
  const p = password || '';
  return e === DEMO_CREDENTIALS.email && p === DEMO_CREDENTIALS.password;
}

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.email === DEMO_CREDENTIALS.email) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function setStoredAuth(remember, email) {
  try {
    if (remember && email) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ email }));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
    const r = remember ? '1' : '';
    localStorage.setItem(STORAGE_KEYS.REMEMBER, r);
  } catch (e) {
    console.error('Failed to store auth', e);
  }
}

export function clearStoredAuth() {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER);
  } catch (e) {
    console.error('Failed to clear auth', e);
  }
}

export function getRememberMe() {
  try {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER) === '1';
  } catch {
    return false;
  }
}

export function getRememberedEmail() {
  const auth = getStoredAuth();
  return auth ? auth.email : '';
}
