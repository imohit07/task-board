import { STORAGE_KEYS } from './constants';

const defaultBoard = () => ({
  todo: [],
  doing: [],
  done: [],
});

export function getBoardFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOARD);
    if (!raw) return defaultBoard();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultBoard();
    return {
      todo: Array.isArray(parsed.todo) ? parsed.todo : [],
      doing: Array.isArray(parsed.doing) ? parsed.doing : [],
      done: Array.isArray(parsed.done) ? parsed.done : [],
    };
  } catch {
    return defaultBoard();
  }
}

export function saveBoardToStorage(board) {
  try {
    localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(board));
  } catch (e) {
    console.error('Failed to save board', e);
  }
}

const maxActivityEntries = 50;

export function getActivityFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, maxActivityEntries) : [];
  } catch {
    return [];
  }
}

export function saveActivityToStorage(activity) {
  try {
    const list = activity.slice(0, maxActivityEntries);
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save activity', e);
  }
}

export function clearBoardStorage() {
  try {
    localStorage.removeItem(STORAGE_KEYS.BOARD);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
  } catch (e) {
    console.error('Failed to clear board storage', e);
  }
}
