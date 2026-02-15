import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { COLUMNS, ACTIVITY_TYPES } from '../lib/constants';
import {
  getBoardFromStorage,
  saveBoardToStorage,
  getActivityFromStorage,
  saveActivityToStorage,
  clearBoardStorage,
} from '../lib/storage';
import {
  createTask,
  sortTasksByDueDate,
  filterTasksByPriority,
  filterTasksBySearch,
} from '../lib/taskUtils';

const BoardContext = createContext(null);

function addActivityEntry(prev, entry) {
  const next = [{ ...entry, at: new Date().toISOString() }, ...prev];
  return next.slice(0, 50);
}

export function BoardProvider({ children }) {
  const [board, setBoard] = useState(getBoardFromStorage);
  const [activity, setActivity] = useState(getActivityFromStorage);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    saveBoardToStorage(board);
  }, [board]);

  useEffect(() => {
    saveActivityToStorage(activity);
  }, [activity]);

  const addTask = useCallback((taskData) => {
    const task = createTask({ ...taskData, columnId: COLUMNS.TODO });
    setBoard((prev) => ({
      ...prev,
      todo: sortTasksByDueDate([...prev.todo, task]),
    }));
    setActivity((prev) =>
      addActivityEntry(prev, { type: ACTIVITY_TYPES.CREATED, taskId: task.id, title: task.title })
    );
    return task;
  }, []);

  const updateTask = useCallback((id, updates) => {
    setBoard((prev) => {
      const next = { ...prev };
      for (const col of Object.keys(COLUMNS)) {
        const key = COLUMNS[col];
        const idx = next[key].findIndex((t) => t.id === id);
        if (idx === -1) continue;
        const task = { ...next[key][idx], ...updates };
        const list = [...next[key]];
        list[idx] = task;
        next[key] = sortTasksByDueDate(list);
        return next;
      }
      return next;
    });
    setActivity((a) =>
      addActivityEntry(a, { type: ACTIVITY_TYPES.EDITED, taskId: id, title: updates.title })
    );
  }, []);

  const deleteTask = useCallback((id, title = '') => {
    setBoard((prev) => {
      const next = { ...prev };
      for (const key of Object.values(COLUMNS)) {
        const idx = next[key].findIndex((t) => t.id === id);
        if (idx !== -1) {
          next[key] = next[key].filter((_, i) => i !== idx);
          break;
        }
      }
      return next;
    });
    setActivity((a) => addActivityEntry(a, { type: ACTIVITY_TYPES.DELETED, taskId: id, title }));
  }, []);

  const moveTask = useCallback((taskId, fromColumn, toColumn, taskTitle = '') => {
    if (fromColumn === toColumn) return;
    setBoard((prev) => {
      const fromKey = fromColumn;
      const toKey = toColumn;
      const task = prev[fromKey]?.find((t) => t.id === taskId);
      if (!task) return prev;
      const updated = { ...task, columnId: toKey };
      return {
        ...prev,
        [fromKey]: prev[fromKey].filter((t) => t.id !== taskId),
        [toKey]: sortTasksByDueDate([...(prev[toKey] || []), updated]),
      };
    });
    setActivity((a) =>
      addActivityEntry(a, {
        type: ACTIVITY_TYPES.MOVED,
        taskId,
        title: taskTitle,
        from: fromColumn,
        to: toColumn,
      })
    );
  }, []);

  const resetBoard = useCallback(() => {
    clearBoardStorage();
    setBoard({ todo: [], doing: [], done: [] });
    setActivity([]);
  }, []);

  const getFilteredColumn = useCallback(
    (columnKey) => {
      let list = board[columnKey] || [];
      list = filterTasksBySearch(list, search);
      list = filterTasksByPriority(list, priorityFilter);
      return sortTasksByDueDate(list);
    },
    [board, search, priorityFilter]
  );

  const value = {
    board,
    activity,
    search,
    setSearch,
    priorityFilter,
    setPriorityFilter,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    resetBoard,
    getFilteredColumn,
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error('useBoard must be used within BoardProvider');
  return ctx;
}
