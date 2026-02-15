import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateCredentials,
  setStoredAuth,
  clearStoredAuth,
  getStoredAuth,
  getRememberedEmail,
} from './auth';
import { STORAGE_KEYS, DEMO_CREDENTIALS } from './constants';

describe('auth', () => {
  beforeEach(() => {
    clearStoredAuth();
  });

  it('accepts valid demo credentials', () => {
    expect(validateCredentials(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)).toBe(true);
    expect(validateCredentials('intern@demo.com', 'intern123')).toBe(true);
  });

  it('rejects invalid credentials', () => {
    expect(validateCredentials('wrong@demo.com', 'intern123')).toBe(false);
    expect(validateCredentials('intern@demo.com', 'wrong')).toBe(false);
    expect(validateCredentials('', '')).toBe(false);
  });

  it('stores and returns remembered email', () => {
    setStoredAuth(true, DEMO_CREDENTIALS.email);
    expect(getStoredAuth()).toEqual({ email: DEMO_CREDENTIALS.email });
    expect(getRememberedEmail()).toBe(DEMO_CREDENTIALS.email);
    clearStoredAuth();
    expect(getStoredAuth()).toBeNull();
  });
});
