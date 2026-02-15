import { describe, it, expect, beforeEach } from 'vitest';
import {
  getBoardFromStorage,
  saveBoardToStorage,
  getActivityFromStorage,
  clearBoardStorage,
} from './storage';

describe('storage', () => {
  beforeEach(() => {
    clearBoardStorage();
  });

  it('returns default board when storage is empty', () => {
    const board = getBoardFromStorage();
    expect(board).toEqual({ todo: [], doing: [], done: [] });
  });

  it('persists and restores board state', () => {
    const board = {
      todo: [{ id: '1', title: 'Task' }],
      doing: [],
      done: [],
    };
    saveBoardToStorage(board);
    expect(getBoardFromStorage()).toEqual(board);
  });

  it('returns empty activity when storage is empty', () => {
    expect(getActivityFromStorage()).toEqual([]);
  });
});
